export type SpackleType = 'pva' | 'acrilica' | 'gesso_liso';
export type WallCondition = 'reboco_novo' | 'repintura' | 'drywall_gesso';

export interface SpackleInputs {
  areaM2: number;
  spackleType: SpackleType;
  wallCondition: WallCondition;
  coats: number; // 1 or 2 demãos
  wasteMarginPercent: number;
}

export interface SpackleCalculationResult {
  spackleName: string;
  totalAreaM2: number;
  consumptionKgPerM2: number;
  totalWeightKg: number;
  barrels25kg: number;
  buckets18L: number;
  wasteMarginUsed: number;
}
