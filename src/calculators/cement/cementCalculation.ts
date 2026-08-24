import { CementInputs, CementCalculationResult, CementServiceType } from './cementTypes';

export const CEMENT_SERVICES: Record<
  CementServiceType,
  {
    name: string;
    defaultThicknessCm: number;
    description: string;
    cementBagsPerM3: number;
    sandM3PerM3: number;
    limeBags20kgPerM3?: number;
    gravelM3PerM3?: number;
  }
> = {
  contrapiso: {
    name: 'Contrapiso (Farofa 1:4)',
    defaultThicknessCm: 3.5,
    description: 'Nivelamento e regularização de lajes e pisos para receber cerâmica ou vinílico.',
    cementBagsPerM3: 6.0,
    sandM3PerM3: 1.05,
  },
  reboco: {
    name: 'Reboco / Emboço Paulista (1:2:8)',
    defaultThicknessCm: 1.8,
    description: 'Revestimento de paredes internas e externas com cimento, cal e areia fina/média.',
    cementBagsPerM3: 4.5,
    sandM3PerM3: 1.1,
    limeBags20kgPerM3: 7.0,
  },
  assentamento: {
    name: 'Massa para Assentar Tijolos (1:2:8)',
    defaultThicknessCm: 1.5,
    description: 'Argamassa tradicional de obra para levantar paredes de tijolos ou blocos.',
    cementBagsPerM3: 5.0,
    sandM3PerM3: 1.1,
    limeBags20kgPerM3: 8.0,
  },
  concreto: {
    name: 'Concreto Estrutural (Traço 1:2:3)',
    defaultThicknessCm: 10.0,
    description: 'Lajes, pilares, vigas, sapatas e calçadas.',
    cementBagsPerM3: 7.0,
    sandM3PerM3: 0.67,
    gravelM3PerM3: 0.84,
  },
};

export function calculateCement(inputs: CementInputs): CementCalculationResult {
  const service = CEMENT_SERVICES[inputs.serviceType] || CEMENT_SERVICES.contrapiso;

  let volumeTotalM3 = 0;
  if (inputs.serviceType === 'concreto' && inputs.volumeM3 && inputs.volumeM3 > 0) {
    volumeTotalM3 = inputs.volumeM3;
  } else {
    const area = Math.max(0, inputs.areaM2 || 0);
    const thicknessM = Math.max(0.005, (inputs.thicknessCm || service.defaultThicknessCm) / 100);
    volumeTotalM3 = area * thicknessM;
  }

  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 10);
  const effectiveVolumeM3 = volumeTotalM3 * (1 + wasteMarginUsed / 100);

  const cementBags50kg = Math.ceil(effectiveVolumeM3 * service.cementBagsPerM3);
  const sandM3 = Math.round(effectiveVolumeM3 * service.sandM3PerM3 * 100) / 100;
  const sand18LCans = Math.round(sandM3 * 54);

  const limeBags20kg = service.limeBags20kgPerM3
    ? Math.ceil(effectiveVolumeM3 * service.limeBags20kgPerM3)
    : undefined;

  const gravelM3 = service.gravelM3PerM3
    ? Math.round(effectiveVolumeM3 * service.gravelM3PerM3 * 100) / 100
    : undefined;

  const gravel18LCans = gravelM3 ? Math.round(gravelM3 * 54) : undefined;

  return {
    serviceName: service.name,
    volumeTotalM3: Math.round(volumeTotalM3 * 100) / 100,
    cementBags50kg,
    sandM3,
    sand18LCans,
    limeBags20kg,
    gravelM3,
    gravel18LCans,
    wasteMarginUsed,
  };
}
