import { BrickInputs, BrickCalculationResult, BrickType } from './brickTypes';
import { convertToMeters } from '../../utils/formatters';

interface BrickDimensions {
  lengthCm: number;
  heightCm: number;
  widthCm: number;
  name: string;
}

export const BRICK_SPECS: Record<BrickType, BrickDimensions> = {
  baiano_8: { lengthCm: 19, heightCm: 19, widthCm: 9, name: 'Tijolo Baiano 8 furos (9×19×19 cm)' },
  baiano_6: { lengthCm: 19, heightCm: 14, widthCm: 9, name: 'Tijolo Baiano 6 furos (9×14×19 cm)' },
  baiano_9: { lengthCm: 24, heightCm: 14, widthCm: 11.5, name: 'Tijolo Baiano 9 furos (11.5×14×24 cm)' },
  bloco_14_39: { lengthCm: 39, heightCm: 19, widthCm: 14, name: 'Bloco de Concreto Estrutural (14×19×39 cm)' },
  bloco_19_39: { lengthCm: 39, heightCm: 19, widthCm: 19, name: 'Bloco de Concreto Estrutural (19×19×39 cm)' },
  bloco_9_39: { lengthCm: 39, heightCm: 19, widthCm: 9, name: 'Bloco de Concreto Vedação (9×19×39 cm)' },
  macico_5_10_20: { lengthCm: 20, heightCm: 5, widthCm: 10, name: 'Tijolo Maciço Cerâmico (5×10×20 cm)' },
  ecologico_modular: { lengthCm: 25, heightCm: 6.25, widthCm: 12.5, name: 'Tijolo Ecológico Modular (12.5×25×6.25 cm)' },
  custom: { lengthCm: 20, heightCm: 20, widthCm: 10, name: 'Tijolo / Bloco Personalizado' },
};

export function calculateBricks(inputs: BrickInputs): BrickCalculationResult {
  // 1. Calculate Gross Wall Area
  const grossWallAreaM2 = inputs.walls.reduce((sum, w) => {
    const wm = convertToMeters(w.width, w.unit);
    const hm = convertToMeters(w.height, w.unit);
    return sum + wm * hm;
  }, 0);

  // 2. Openings Deduction Area
  const openingsDeductionM2 = inputs.openings.reduce((sum, op) => {
    const wm = convertToMeters(op.width, op.unit);
    const hm = convertToMeters(op.height, op.unit);
    return sum + wm * hm * (op.quantity || 1);
  }, 0);

  // 3. Net Wall Area
  const netWallAreaM2 = Math.max(0, grossWallAreaM2 - openingsDeductionM2);

  // 4. Brick dimensions & Joint
  const spec = BRICK_SPECS[inputs.brickType] || BRICK_SPECS.baiano_8;
  const lCm = inputs.brickType === 'custom' && inputs.customLengthCm ? inputs.customLengthCm : spec.lengthCm;
  const hCm = inputs.brickType === 'custom' && inputs.customHeightCm ? inputs.customHeightCm : spec.heightCm;
  const jCm = inputs.brickType === 'ecologico_modular' ? 0 : Math.max(0.5, inputs.jointThicknessCm || 1.5);

  // Formula: 1 / [ (Comprimento + Junta) * (Altura + Junta) em metros ]
  const effectiveLengthM = (lCm + jCm) / 100;
  const effectiveHeightM = (hCm + jCm) / 100;
  const unitModuleAreaM2 = effectiveLengthM * effectiveHeightM;

  const bricksPerM2 = unitModuleAreaM2 > 0 ? 1 / unitModuleAreaM2 : 25;
  const rawBrickCount = Math.ceil(netWallAreaM2 * bricksPerM2);

  // 5. Waste Margin
  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 10);
  const recommendedBrickCount = Math.ceil(rawBrickCount * (1 + wasteMarginUsed / 100));

  // 6. Mortar Estimation for laying bricks:
  // For clay bricks ~ 1.2 bags of 20kg per m²
  // For concrete blocks ~ 0.8 bags of 20kg per m²
  // For ecological blocks ~ 0.2 bags (glue)
  let mortarBagsPerM2 = 1.1;
  if (inputs.brickType.startsWith('bloco_')) mortarBagsPerM2 = 0.8;
  if (inputs.brickType === 'ecologico_modular') mortarBagsPerM2 = 0.2;
  if (inputs.brickType === 'macico_5_10_20') mortarBagsPerM2 = 2.0;

  const mortarBagsEstimate20kg = Math.ceil(netWallAreaM2 * mortarBagsPerM2 * (1 + wasteMarginUsed / 100));
  const sandVolumeM3 = Math.round(netWallAreaM2 * 0.025 * 100) / 100; // ~ 0.025 m³ sand/m² of wall
  const cementBags50kg = Math.ceil(netWallAreaM2 * 0.15); // ~ 0.15 bag of 50kg/m² of wall for 1:4 mortar

  return {
    grossWallAreaM2,
    openingsDeductionM2,
    netWallAreaM2,
    bricksPerM2: Math.round(bricksPerM2 * 10) / 10,
    rawBrickCount,
    recommendedBrickCount,
    wasteMarginUsed,
    mortarBagsEstimate20kg,
    sandVolumeM3,
    cementBags50kg,
  };
}
