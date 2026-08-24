export interface BaseboardInputs {
  mode: 'room_dimensions' | 'perimeter_direct';
  roomLengthM: number;
  roomWidthM: number;
  perimeterDirectM: number;
  doorCount: number;
  doorWidthM: number;
  barLengthM: number; // e.g. 2.40m or 2.00m
  wasteMarginPercent: number; // e.g. 10%
}

export interface BaseboardCalculationResult {
  grossPerimeterM: number;
  doorsDeductionM: number;
  netPerimeterM: number;
  totalWithWasteM: number;
  barsNeeded: number;
  barLengthUsedM: number;
  wasteMarginUsed: number;
}
