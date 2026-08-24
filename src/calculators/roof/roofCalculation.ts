import { RoofInputs, RoofCalculationResult, RoofTileModel } from './roofTypes';

export const ROOF_TILE_SPECS: Record<
  RoofTileModel,
  {
    name: string;
    tilesPerM2: number;
    minSlopePercent: number;
    unitLabel: string;
    description: string;
  }
> = {
  romana: {
    name: 'Telha Cerâmica Romana',
    tilesPerM2: 16.0,
    minSlopePercent: 30,
    unitLabel: 'telhas',
    description: 'Encaixe clássico de alto rendimento. Muito usada em todo o Brasil (16 telhas/m²).',
  },
  portuguesa: {
    name: 'Telha Cerâmica Portuguesa',
    tilesPerM2: 17.0,
    minSlopePercent: 35,
    unitLabel: 'telhas',
    description: 'Ondulada elegante com ótima vedação contra chuva de vento (17 telhas/m²).',
  },
  colonial: {
    name: 'Telha Colonial / Canal',
    tilesPerM2: 24.0,
    minSlopePercent: 30,
    unitLabel: 'telhas',
    description: 'Telha tradicional em formato de calha capa-e-canal (24 telhas/m²).',
  },
  francesa: {
    name: 'Telha Francesa',
    tilesPerM2: 14.5,
    minSlopePercent: 40,
    unitLabel: 'telhas',
    description: 'Plana com encaixes laterais reforçados (14,5 telhas/m²).',
  },
  fibrocimento_244_110: {
    name: 'Telha de Fibrocimento (2,44 × 1,10m)',
    tilesPerM2: 0.46, // Área útil ~2.18m²
    minSlopePercent: 10,
    unitLabel: 'folhas',
    description: 'Telha ondulada grande de montagem rápida e baixo peso estrutural.',
  },
  metalica_trapezoidal: {
    name: 'Telha Metálica / Sanduíche Trapezoidal',
    tilesPerM2: 0.35, // Peças sob medida
    minSlopePercent: 5,
    unitLabel: 'm² de telha',
    description: 'Excelente isolamento térmico e acústico, ideal para coberturas leves.',
  },
};

export function calculateRoof(inputs: RoofInputs): RoofCalculationResult {
  let horizontalProjectionAreaM2 = 0;
  let realInclinedAreaM2 = 0;
  let slopeCorrectionFactor = 1.0;

  if (inputs.inputMode === 'real_area') {
    realInclinedAreaM2 = Math.max(0, inputs.realRoofAreaM2 || 0);
    horizontalProjectionAreaM2 = realInclinedAreaM2;
  } else {
    const l = Math.max(0, inputs.houseLengthM || 0);
    const w = Math.max(0, inputs.houseWidthM || 0);
    const eaves = Math.max(0, inputs.eavesM || 0.6);

    // Total width and length with eaves on both sides
    const totalL = l > 0 ? l + 2 * eaves : 0;
    const totalW = w > 0 ? w + 2 * eaves : 0;

    horizontalProjectionAreaM2 = totalL * totalW;

    // Slope correction formula: Factor = sqrt(1 + (slope% / 100)^2)
    const slope = Math.max(5, inputs.slopePercent || 30);
    slopeCorrectionFactor = Math.sqrt(1 + Math.pow(slope / 100, 2));

    realInclinedAreaM2 = horizontalProjectionAreaM2 * slopeCorrectionFactor;
  }

  const spec = ROOF_TILE_SPECS[inputs.tileModel] || ROOF_TILE_SPECS.romana;
  const rawTileCount = realInclinedAreaM2 * spec.tilesPerM2;

  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 5);
  const recommendedTileCount = Math.ceil(rawTileCount * (1 + wasteMarginUsed / 100));

  // Ridge tiles (Cumeeiras) estimation: ~3 pieces per linear meter of ridge
  const ridgeLengthM = inputs.houseLengthM > 0 ? inputs.houseLengthM + 2 * (inputs.eavesM || 0.6) : 0;
  const ridgeTilesCount = Math.ceil(ridgeLengthM * 3.0 * (1 + wasteMarginUsed / 100));

  return {
    horizontalProjectionAreaM2: Math.round(horizontalProjectionAreaM2 * 100) / 100,
    slopeCorrectionFactor: Math.round(slopeCorrectionFactor * 1000) / 1000,
    realInclinedAreaM2: Math.round(realInclinedAreaM2 * 100) / 100,
    tileModelName: spec.name,
    tilesPerM2: spec.tilesPerM2,
    rawTileCount: Math.ceil(rawTileCount),
    recommendedTileCount,
    ridgeTilesCount: ridgeTilesCount > 0 ? ridgeTilesCount : 0,
    wasteMarginUsed,
  };
}
