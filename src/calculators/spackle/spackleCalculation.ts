import { SpackleInputs, SpackleCalculationResult, SpackleType } from './spackleTypes';

export const SPACKLE_TYPES: Record<
  SpackleType,
  {
    name: string;
    baseYieldKgPerM2Coats2: number;
    description: string;
    recommendedFor: string;
  }
> = {
  pva: {
    name: 'Massa Corrida PVA',
    baseYieldKgPerM2Coats2: 1.2,
    description: 'Fácil de lixar, solúvel em água, acabamento liso acetinado.',
    recommendedFor: 'Apenas áreas internas secas (quartos, salas, corredores).',
  },
  acrilica: {
    name: 'Massa Acrílica',
    baseYieldKgPerM2Coats2: 1.5,
    description: 'Resistente à umidade, sol e chuva, alta aderência.',
    recommendedFor: 'Áreas molhadas (banheiros, cozinhas, lavanderias) e fachadas externas.',
  },
  gesso_liso: {
    name: 'Gesso Liso / Desempenado',
    baseYieldKgPerM2Coats2: 0.8,
    description: 'Regularização rápida e econômica direta sobre alvenaria.',
    recommendedFor: 'Teto e paredes internas sobre tijolo ou reboco.',
  },
};

export function calculateSpackle(inputs: SpackleInputs): SpackleCalculationResult {
  const spec = SPACKLE_TYPES[inputs.spackleType] || SPACKLE_TYPES.pva;
  const areaM2 = Math.max(0, inputs.areaM2 || 0);

  // Condition factor
  let conditionFactor = 1.0;
  if (inputs.wallCondition === 'reboco_novo') conditionFactor = 1.35; // Gasta mais para nivelar poros
  if (inputs.wallCondition === 'drywall_gesso') conditionFactor = 0.70; // Superfície já bem lisa

  // Coats factor
  const coats = Math.max(1, inputs.coats || 2);
  const coatsFactor = coats === 1 ? 0.6 : 1.0;

  const consumptionKgPerM2 = spec.baseYieldKgPerM2Coats2 * conditionFactor * coatsFactor;

  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 5);
  const totalWeightKg = areaM2 * consumptionKgPerM2 * (1 + wasteMarginUsed / 100);

  const barrels25kg = Math.ceil(totalWeightKg / 25);
  const buckets18L = Math.ceil(totalWeightKg / 20); // Baldes ~20kg

  return {
    spackleName: spec.name,
    totalAreaM2: areaM2,
    consumptionKgPerM2: Math.round(consumptionKgPerM2 * 100) / 100,
    totalWeightKg: Math.round(totalWeightKg * 10) / 10,
    barrels25kg,
    buckets18L,
    wasteMarginUsed,
  };
}
