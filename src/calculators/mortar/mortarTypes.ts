export type MortarType = 'ac1' | 'ac2' | 'ac3' | 'reboco_pronto' | 'porcelanato_interno';
export type BondingMethod = 'single' | 'double'; // colagem simples vs dupla colagem

export interface MortarInputs {
  mortarType: MortarType;
  areaM2: number;
  bondingMethod: BondingMethod;
  pieceSizeCm?: number; // e.g. 60cm
  layerThicknessCm?: number; // for reboco pronto
  wasteMarginPercent: number;
}

export interface MortarCalculationResult {
  mortarName: string;
  totalAreaM2: number;
  consumptionKgPerM2: number;
  totalWeightKg: number;
  bags20kg: number;
  wasteMarginUsed: number;
  bondingRecommendation: string;
}
