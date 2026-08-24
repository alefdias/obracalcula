import { PaintInputs, PaintCalculationResult, PaintType, CommercialPaintPacks } from './paintTypes';
import { convertToMeters } from '../../utils/formatters';

export const PAINT_YIELDS: Record<PaintType, { name: string; yieldM2PerL: number; description: string }> = {
  standard: { name: 'Acrílica Standard', yieldM2PerL: 10, description: 'Excelente custo-benefício para interiores e quartos (10 m²/L por demão)' },
  premium: { name: 'Acrílica Premium / Super Lavável', yieldM2PerL: 12, description: 'Alta cobertura, lavável e máxima durabilidade (12 m²/L por demão)' },
  economica: { name: 'Látex Econômica', yieldM2PerL: 8, description: 'Indicada apenas para áreas internas secas (8 m²/L por demão)' },
  esmalte: { name: 'Esmalte Sintético (Madeira/Metal)', yieldM2PerL: 12, description: 'Para portas, janelas, rodapés e grades (12 m²/L por demão)' },
  epoxi: { name: 'Tinta Epóxi (Azulejo/Piso)', yieldM2PerL: 10, description: 'Alta resistência química para banheiros e pisos (10 m²/L por demão)' },
  teto: { name: 'Tinta Específica para Teto', yieldM2PerL: 9, description: 'Fosca antirrespingo que esconde imperfeições da laje (9 m²/L por demão)' },
};

export function optimizePackaging(totalLiters: number): CommercialPaintPacks {
  let remaining = totalLiters;
  let cans18L = 0;
  let gallons3_6L = 0;
  let quarts0_9L = 0;

  // If >= 14.4L, it is already cheaper or same price to buy a full 18L can than 4 gallons
  if (remaining >= 14.4) {
    cans18L = Math.floor(remaining / 18);
    remaining = remaining % 18;

    // If remaining is >= 14.4L, round up to another 18L can
    if (remaining >= 14.4) {
      cans18L += 1;
      remaining = 0;
    }
  }

  // Next handle gallons of 3.6L
  if (remaining >= 2.7) {
    gallons3_6L = Math.floor(remaining / 3.6);
    remaining = remaining % 3.6;

    // If remaining is >= 2.7L, round up to another 3.6L gallon (since 3 quarts = 2.7L costs more than 1 gallon)
    if (remaining >= 2.7) {
      gallons3_6L += 1;
      remaining = 0;
    }
  }

  // Next handle quarts of 0.9L
  if (remaining > 0) {
    quarts0_9L = Math.ceil(remaining / 0.9);
    // If 4 quarts, convert to 1 gallon
    if (quarts0_9L >= 4) {
      gallons3_6L += 1;
      quarts0_9L = 0;
    }
  }

  const totalLitersPackaged = cans18L * 18 + gallons3_6L * 3.6 + quarts0_9L * 0.9;

  return {
    cans18L,
    gallons3_6L,
    quarts0_9L,
    totalLitersPackaged: Math.round(totalLitersPackaged * 10) / 10,
  };
}

export function calculatePaint(inputs: PaintInputs): PaintCalculationResult {
  let wallsGrossAreaM2 = 0;
  let ceilingAreaM2 = 0;
  let openingsDeductionM2 = 0;

  if (inputs.mode === 'simple_room') {
    const l = Math.max(0, inputs.roomLength || 0);
    const w = Math.max(0, inputs.roomWidth || 0);
    const h = Math.max(0, inputs.wallHeight || 2.8);

    // Perimeter * Height = 2 * (L + W) * H
    wallsGrossAreaM2 = 2 * (l + w) * h;

    if (inputs.includeCeiling) {
      ceilingAreaM2 = l * w;
    }

    // Default deductions in simple room if openings present
    openingsDeductionM2 = inputs.openings.reduce((sum, op) => {
      const wm = convertToMeters(op.width, op.unit);
      const hm = convertToMeters(op.height, op.unit);
      return sum + wm * hm * (op.quantity || 1);
    }, 0);
  } else if (inputs.mode === 'custom_walls') {
    wallsGrossAreaM2 = inputs.walls.reduce((sum, wall) => {
      const wm = convertToMeters(wall.width, wall.unit);
      const hm = convertToMeters(wall.height, wall.unit);
      return sum + wm * hm;
    }, 0);

    openingsDeductionM2 = inputs.openings.reduce((sum, op) => {
      const wm = convertToMeters(op.width, op.unit);
      const hm = convertToMeters(op.height, op.unit);
      return sum + wm * hm * (op.quantity || 1);
    }, 0);
  } else {
    // direct area
    wallsGrossAreaM2 = Math.max(0, inputs.directAreaM2 || 0);
    openingsDeductionM2 = 0;
  }

  const totalNetPaintingAreaM2 = Math.max(0, wallsGrossAreaM2 + ceilingAreaM2 - openingsDeductionM2);

  // Coats
  const coats = Math.max(1, inputs.coats || 2);
  const totalAreaWithCoatsM2 = totalNetPaintingAreaM2 * coats;

  // Paint Yield
  const spec = PAINT_YIELDS[inputs.paintType] || PAINT_YIELDS.standard;
  const paintYieldPerLiter = inputs.customYieldM2PerLiter && inputs.customYieldM2PerLiter > 0
    ? inputs.customYieldM2PerLiter
    : spec.yieldM2PerL;

  const exactLitersNeeded = paintYieldPerLiter > 0 ? totalAreaWithCoatsM2 / paintYieldPerLiter : 0;

  // Waste margin
  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 5);
  const recommendedLiters = exactLitersNeeded * (1 + wasteMarginUsed / 100);

  const packaging = optimizePackaging(recommendedLiters);

  return {
    wallsGrossAreaM2,
    ceilingAreaM2,
    openingsDeductionM2,
    totalNetPaintingAreaM2,
    totalAreaWithCoatsM2,
    paintYieldPerLiter,
    exactLitersNeeded: Math.round(exactLitersNeeded * 100) / 100,
    recommendedLiters: Math.round(recommendedLiters * 10) / 10,
    packaging,
    wasteMarginUsed,
  };
}
