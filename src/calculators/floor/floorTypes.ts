export type FloorInputMode = 'dimensions' | 'area';
export type FloorPattern = 'straight' | 'diagonal';

export interface FloorInputs {
  inputMode: FloorInputMode;
  roomLength: number; // m
  roomWidth: number;  // m
  roomArea: number;   // m² directly if area mode
  pieceLengthCm: number; // cm
  pieceWidthCm: number;  // cm
  pattern: FloorPattern;
  wasteMarginPercent: number; // e.g. 10
  boxCoverageM2?: number; // m² por caixa se conhecido
  piecesPerBox?: number;  // peças por caixa se conhecido
}

export interface FloorCalculationResult {
  netAreaM2: number;
  grossAreaWithWasteM2: number;
  pieceAreaM2: number;
  rawPieceCount: number;
  recommendedPieceCount: number;
  boxesEstimated?: number;
  boxCoverageUsed: number;
  wasteMarginUsed: number;
  baseboardSuggestionM?: number; // Linear meters if dimensions provided
}
