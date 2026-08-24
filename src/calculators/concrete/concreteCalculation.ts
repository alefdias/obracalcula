import { ConcreteInputs, ConcreteCalculationResult, ConcreteStrengthType } from './concreteTypes';

export const CONCRETE_MIX_SPECS: Record<
  ConcreteStrengthType,
  {
    name: string;
    ratio: string;
    cementBagsPerM3: number;
    sandM3PerM3: number;
    gravelM3PerM3: number;
    waterLitersPerM3: number;
    description: string;
  }
> = {
  structural_25mpa: {
    name: 'Estrutural (~20 a 25 MPa)',
    ratio: '1 : 2 : 3 (Cimento : Areia : Brita)',
    cementBagsPerM3: 7.0,
    sandM3PerM3: 0.67,
    gravelM3PerM3: 0.84,
    waterLitersPerM3: 190,
    description: 'Para lajes maciças, vigas, colunas/pilares e sapatas estruturais.',
  },
  floor_18mpa: {
    name: 'Piso e Calçada (~15 a 18 MPa)',
    ratio: '1 : 2.5 : 3.5 (Cimento : Areia : Brita)',
    cementBagsPerM3: 5.8,
    sandM3PerM3: 0.72,
    gravelM3PerM3: 0.88,
    waterLitersPerM3: 180,
    description: 'Para pisos de garagem, passeios públicos, calçadas e garagens residenciais.',
  },
  lean_12mpa: {
    name: 'Concreto Magro / Regularização (~10 a 12 MPa)',
    ratio: '1 : 3 : 4 (Cimento : Areia : Brita)',
    cementBagsPerM3: 4.5,
    sandM3PerM3: 0.75,
    gravelM3PerM3: 0.90,
    waterLitersPerM3: 170,
    description: 'Para fundo de sapatas, lastro de piso e proteção contra umidade da terra.',
  },
};

export function calculateConcrete(inputs: ConcreteInputs): ConcreteCalculationResult {
  let baseVolumeM3 = 0;

  if (inputs.elementType === 'direct_volume') {
    baseVolumeM3 = Math.max(0, inputs.directVolumeM3 || 0);
  } else {
    const l = Math.max(0, inputs.lengthM || 0);
    const w = Math.max(0, inputs.widthM || 0);
    const thicknessM = Math.max(0, (inputs.thicknessCm || 10) / 100);
    const qty = Math.max(1, inputs.quantity || 1);

    baseVolumeM3 = l * w * thicknessM * qty;
  }

  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 5);
  const totalVolumeWithWasteM3 = baseVolumeM3 * (1 + wasteMarginUsed / 100);

  const mix = CONCRETE_MIX_SPECS[inputs.strengthType] || CONCRETE_MIX_SPECS.structural_25mpa;

  const cementBags50kg = Math.ceil(totalVolumeWithWasteM3 * mix.cementBagsPerM3);
  const sandM3 = Math.round(totalVolumeWithWasteM3 * mix.sandM3PerM3 * 100) / 100;
  const gravelM3 = Math.round(totalVolumeWithWasteM3 * mix.gravelM3PerM3 * 100) / 100;
  const waterLiters = Math.round(totalVolumeWithWasteM3 * mix.waterLitersPerM3);

  // 1 m³ of sand ~ 54 cans of 18L
  const sand18LCans = Math.round(sandM3 * 54);
  const gravel18LCans = Math.round(gravelM3 * 54);

  return {
    baseVolumeM3: Math.round(baseVolumeM3 * 100) / 100,
    totalVolumeWithWasteM3: Math.round(totalVolumeWithWasteM3 * 100) / 100,
    cementBags50kg,
    sandM3,
    sand18LCans,
    gravelM3,
    gravel18LCans,
    waterLiters,
    wasteMarginUsed,
    strengthName: mix.name,
  };
}
