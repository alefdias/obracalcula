export type ConcreteElementType = 'slab' | 'floor' | 'beam' | 'footing' | 'direct_volume';
export type ConcreteStrengthType = 'structural_25mpa' | 'floor_18mpa' | 'lean_12mpa';

export interface ConcreteInputs {
  elementType: ConcreteElementType;
  lengthM: number;
  widthM: number;
  thicknessCm: number; // in cm for convenience (e.g. 8cm, 10cm, 12cm)
  quantity: number; // For beams, columns, footings
  directVolumeM3: number;
  strengthType: ConcreteStrengthType;
  wasteMarginPercent: number; // 5 to 10
}

export interface ConcreteCalculationResult {
  baseVolumeM3: number;
  totalVolumeWithWasteM3: number;
  cementBags50kg: number;
  sandM3: number;
  sand18LCans: number;
  gravelM3: number;
  gravel18LCans: number;
  waterLiters: number;
  wasteMarginUsed: number;
  strengthName: string;
}
