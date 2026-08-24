export type GroutType = 'cimenticio' | 'acrilico' | 'epoxi';

export interface GroutInputs {
  areaM2: number;
  pieceLengthMm: number;
  pieceWidthMm: number;
  pieceThicknessMm: number;
  jointWidthMm: number;
  groutType: GroutType;
  wasteMarginPercent: number;
}

export interface GroutCalculationResult {
  groutName: string;
  totalAreaM2: number;
  consumptionKgPerM2: number;
  totalWeightKg: number;
  packages1kg: number;
  packages5kg: number;
  wasteMarginUsed: number;
}
