export type RoofTileModel = 
  | 'romana' 
  | 'portuguesa' 
  | 'colonial' 
  | 'francesa' 
  | 'fibrocimento_244_110' 
  | 'metalica_trapezoidal';

export interface RoofInputs {
  inputMode: 'projection' | 'real_area';
  houseLengthM: number;
  houseWidthM: number;
  eavesM: number; // Beirais (ex: 0.60m)
  slopePercent: number; // Inclinação (ex: 35%)
  realRoofAreaM2: number;
  tileModel: RoofTileModel;
  roofWaterCount: number; // 1, 2 ou 4 águas (para cumeeira)
  wasteMarginPercent: number;
}

export interface RoofCalculationResult {
  horizontalProjectionAreaM2: number;
  slopeCorrectionFactor: number;
  realInclinedAreaM2: number;
  tileModelName: string;
  tilesPerM2: number;
  rawTileCount: number;
  recommendedTileCount: number;
  ridgeTilesCount: number; // Cumeeiras
  wasteMarginUsed: number;
}
