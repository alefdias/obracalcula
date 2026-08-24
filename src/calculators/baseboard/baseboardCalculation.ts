import { BaseboardInputs, BaseboardCalculationResult } from './baseboardTypes';

export function calculateBaseboard(inputs: BaseboardInputs): BaseboardCalculationResult {
  let grossPerimeterM = 0;

  if (inputs.mode === 'room_dimensions') {
    const l = Math.max(0, inputs.roomLengthM || 0);
    const w = Math.max(0, inputs.roomWidthM || 0);
    grossPerimeterM = 2 * (l + w);
  } else {
    grossPerimeterM = Math.max(0, inputs.perimeterDirectM || 0);
  }

  const doorCount = Math.max(0, inputs.doorCount || 0);
  const doorWidth = Math.max(0, inputs.doorWidthM || 0.8);
  const doorsDeductionM = doorCount * doorWidth;

  const netPerimeterM = Math.max(0, grossPerimeterM - doorsDeductionM);

  const wasteMarginUsed = Math.max(0, inputs.wasteMarginPercent || 10);
  const totalWithWasteM = netPerimeterM * (1 + wasteMarginUsed / 100);

  const barLengthUsedM = Math.max(0.5, inputs.barLengthM || 2.4);
  const barsNeeded = Math.ceil(totalWithWasteM / barLengthUsedM);

  return {
    grossPerimeterM: Math.round(grossPerimeterM * 100) / 100,
    doorsDeductionM: Math.round(doorsDeductionM * 100) / 100,
    netPerimeterM: Math.round(netPerimeterM * 100) / 100,
    totalWithWasteM: Math.round(totalWithWasteM * 100) / 100,
    barsNeeded,
    barLengthUsedM,
    wasteMarginUsed,
  };
}
