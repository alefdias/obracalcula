import { FloorInputs, FloorCalculationResult } from './floorTypes';

export function calculateFloor(inputs: FloorInputs): FloorCalculationResult {
  // 1. Calculate base area
  let netAreaM2 = 0;
  let baseboardSuggestionM = 0;

  if (inputs.inputMode === 'dimensions') {
    const l = Math.max(0, inputs.roomLength || 0);
    const w = Math.max(0, inputs.roomWidth || 0);
    netAreaM2 = l * w;
    if (l > 0 && w > 0) {
      // Perimeter minus 1 standard door (0.80m)
      baseboardSuggestionM = Math.max(0, 2 * (l + w) - 0.8);
    }
  } else {
    netAreaM2 = Math.max(0, inputs.roomArea || 0);
  }

  // 2. Piece area in m²
  const pieceLengthM = Math.max(0.01, (inputs.pieceLengthCm || 60) / 100);
  const pieceWidthM = Math.max(0.01, (inputs.pieceWidthCm || 60) / 100);
  const pieceAreaM2 = pieceLengthM * pieceWidthM;

  // 3. Raw piece count without waste
  const rawPieceCount = pieceAreaM2 > 0 ? Math.ceil(netAreaM2 / pieceAreaM2) : 0;

  // 4. Waste margin
  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 10);
  const wasteMultiplier = 1 + wasteMarginUsed / 100;
  const grossAreaWithWasteM2 = netAreaM2 * wasteMultiplier;

  // 5. Recommended pieces
  const recommendedPieceCount = pieceAreaM2 > 0 ? Math.ceil(grossAreaWithWasteM2 / pieceAreaM2) : 0;

  // 6. Boxes estimation
  let boxesEstimated: number | undefined = undefined;
  let boxCoverageUsed = 0;

  if (inputs.boxCoverageM2 && inputs.boxCoverageM2 > 0) {
    boxCoverageUsed = inputs.boxCoverageM2;
    boxesEstimated = Math.ceil(grossAreaWithWasteM2 / inputs.boxCoverageM2);
  } else if (inputs.piecesPerBox && inputs.piecesPerBox > 0) {
    boxCoverageUsed = inputs.piecesPerBox * pieceAreaM2;
    boxesEstimated = Math.ceil(recommendedPieceCount / inputs.piecesPerBox);
  } else {
    // Default standard box coverage estimate ~2.0 m²
    boxCoverageUsed = Math.max(1.44, Math.round(pieceAreaM2 * 4 * 100) / 100);
    boxesEstimated = Math.ceil(grossAreaWithWasteM2 / boxCoverageUsed);
  }

  return {
    netAreaM2,
    grossAreaWithWasteM2,
    pieceAreaM2,
    rawPieceCount,
    recommendedPieceCount,
    boxesEstimated,
    boxCoverageUsed,
    wasteMarginUsed,
    baseboardSuggestionM: baseboardSuggestionM > 0 ? baseboardSuggestionM : undefined,
  };
}
