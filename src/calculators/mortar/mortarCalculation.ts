import { MortarInputs, MortarCalculationResult, MortarType } from './mortarTypes';

export const MORTAR_SPECS: Record<
  MortarType,
  {
    name: string;
    singleConsumptionKg: number;
    doubleConsumptionKg: number;
    recommendedFor: string;
  }
> = {
  ac1: {
    name: 'Argamassa Colante AC-I',
    singleConsumptionKg: 4.5,
    doubleConsumptionKg: 8.5,
    recommendedFor: 'Cerâmicas comuns em pisos e paredes de áreas internas secas (salas, quartos).',
  },
  ac2: {
    name: 'Argamassa Colante AC-II',
    singleConsumptionKg: 5.0,
    doubleConsumptionKg: 9.0,
    recommendedFor: 'Áreas internas molhadas (banheiros, cozinhas, lavanderias) e áreas externas convencionais.',
  },
  ac3: {
    name: 'Argamassa Colante AC-III',
    singleConsumptionKg: 5.5,
    doubleConsumptionKg: 9.5,
    recommendedFor: 'Porcelanatos grandes, placas acima de 80x80cm, fachadas, saunas e piscinas.',
  },
  porcelanato_interno: {
    name: 'Argamassa para Porcelanato Interno',
    singleConsumptionKg: 4.8,
    doubleConsumptionKg: 8.8,
    recommendedFor: 'Especial para pisos e paredes internas revestidas com porcelanato.',
  },
  reboco_pronto: {
    name: 'Argamassa Pronta de Reboco / Assentamento',
    singleConsumptionKg: 17.0, // por cm de espessura
    doubleConsumptionKg: 17.0,
    recommendedFor: 'Reboco de paredes e assentamento direto de alvenaria sem necessidade de misturar areia/cal.',
  },
};

export function calculateMortar(inputs: MortarInputs): MortarCalculationResult {
  const spec = MORTAR_SPECS[inputs.mortarType] || MORTAR_SPECS.ac2;
  const areaM2 = Math.max(0, inputs.areaM2 || 0);

  let consumptionKgPerM2 = 0;
  let bondingRecommendation = 'Colagem simples (argamassa apenas na base com desempenadeira dentada de 6 a 8mm).';

  if (inputs.mortarType === 'reboco_pronto') {
    const thicknessCm = Math.max(0.5, inputs.layerThicknessCm || 1.5);
    consumptionKgPerM2 = spec.singleConsumptionKg * thicknessCm;
    bondingRecommendation = `Aplicação de reboco com espessura média de ${thicknessCm} cm.`;
  } else {
    if (inputs.bondingMethod === 'double') {
      consumptionKgPerM2 = spec.doubleConsumptionKg;
      bondingRecommendation = 'Dupla colagem obrigatória (argamassa na base e no verso da peça) para peças acima de 30x30 cm.';
    } else {
      consumptionKgPerM2 = spec.singleConsumptionKg;
      bondingRecommendation = 'Colagem simples indicada para peças menores de 30x30 cm.';
    }
  }

  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 5);
  const totalWeightKg = areaM2 * consumptionKgPerM2 * (1 + wasteMarginUsed / 100);
  const bags20kg = Math.ceil(totalWeightKg / 20);

  return {
    mortarName: spec.name,
    totalAreaM2: areaM2,
    consumptionKgPerM2: Math.round(consumptionKgPerM2 * 10) / 10,
    totalWeightKg: Math.round(totalWeightKg),
    bags20kg,
    wasteMarginUsed,
    bondingRecommendation,
  };
}
