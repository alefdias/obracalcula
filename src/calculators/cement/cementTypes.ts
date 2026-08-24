export type CementServiceType = 'contrapiso' | 'reboco' | 'assentamento' | 'concreto';

export interface CementInputs {
  serviceType: CementServiceType;
  areaM2: number;
  thicknessCm: number;
  volumeM3?: number;
  wasteMarginPercent: number;
}

export interface CementCalculationResult {
  serviceName: string;
  volumeTotalM3: number;
  cementBags50kg: number;
  sandM3: number;
  sand18LCans: number;
  gravelM3?: number;
  gravel18LCans?: number;
  limeBags20kg?: number; // Cal hidratada para reboco
  wasteMarginUsed: number;
}
