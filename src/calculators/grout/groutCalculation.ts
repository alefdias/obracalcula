import { GroutInputs, GroutCalculationResult, GroutType } from './groutTypes';

export const GROUT_TYPES: Record<
  GroutType,
  {
    name: string;
    coefficient: number;
    description: string;
    recommendedFor: string;
  }
> = {
  cimenticio: {
    name: 'Rejunte Cimentício Resinado',
    coefficient: 1.58,
    description: 'Mais econômico e fácil de aplicar em pisos e paredes convencionais.',
    recommendedFor: 'Salas, quartos, varandas e áreas secas/molháveis.',
  },
  acrilico: {
    name: 'Rejunte Acrílico Pronto',
    coefficient: 1.50,
    description: '100% impermeável, antimofo, acabamento liso e pronto para uso.',
    recommendedFor: 'Banheiros, cozinhas, lavanderias e pisos internos.',
  },
  epoxi: {
    name: 'Rejunte Epóxi Bicomponente',
    coefficient: 1.68,
    description: 'Máxima resistência mecânica e química, acabamento liso e lavável.',
    recommendedFor: 'Dentro do box, piscinas, saunas, garagens e bancadas.',
  },
};

export function calculateGrout(inputs: GroutInputs): GroutCalculationResult {
  const c = Math.max(10, inputs.pieceLengthMm || 600);
  const l = Math.max(10, inputs.pieceWidthMm || 600);
  const e = Math.max(1, inputs.pieceThicknessMm || 8);
  const j = Math.max(0.5, inputs.jointWidthMm || 2);
  const areaM2 = Math.max(0, inputs.areaM2 || 0);

  const spec = GROUT_TYPES[inputs.groutType] || GROUT_TYPES.cimenticio;
  const coef = spec.coefficient;

  // Formula: Consumo (kg/m²) = [(C + L) * E * J * Coef] / (C * L)
  const consumptionKgPerM2 = ((c + l) * e * j * coef) / (c * l);

  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 10);
  const totalWeightKg = areaM2 * consumptionKgPerM2 * (1 + wasteMarginUsed / 100);

  // Package distribution (prefer 5kg if large, else 1kg)
  let packages5kg = 0;
  let packages1kg = 0;

  if (totalWeightKg >= 4.0) {
    packages5kg = Math.floor(totalWeightKg / 5);
    const rem = totalWeightKg % 5;
    if (rem > 0) {
      if (rem > 3.0) {
        packages5kg += 1;
      } else {
        packages1kg = Math.ceil(rem);
      }
    }
  } else {
    packages1kg = Math.ceil(totalWeightKg);
  }

  return {
    groutName: spec.name,
    totalAreaM2: areaM2,
    consumptionKgPerM2: Math.round(consumptionKgPerM2 * 1000) / 1000,
    totalWeightKg: Math.round(totalWeightKg * 100) / 100,
    packages1kg,
    packages5kg,
    wasteMarginUsed,
  };
}
