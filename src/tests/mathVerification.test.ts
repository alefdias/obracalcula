import { calculateFloor } from '../calculators/floor/floorCalculation';
import { calculateBricks } from '../calculators/bricks/brickCalculation';
import { calculatePaint } from '../calculators/paint/paintCalculation';
import { calculateConcrete } from '../calculators/concrete/concreteCalculation';
import { calculateCement } from '../calculators/cement/cementCalculation';
import { calculateMortar } from '../calculators/mortar/mortarCalculation';
import { calculateRoof } from '../calculators/roof/roofCalculation';
import { calculateGrout } from '../calculators/grout/groutCalculation';
import { calculateBaseboard } from '../calculators/baseboard/baseboardCalculation';
import { calculateSpackle } from '../calculators/spackle/spackleCalculation';

console.log('--- EXECUTANDO TESTES DAS CALCULADORAS DO OBRACALCULA ---');

// 1. Piso
const floorRes = calculateFloor({
  inputMode: 'dimensions',
  roomLength: 5,
  roomWidth: 4,
  roomArea: 20,
  pieceLengthCm: 60,
  pieceWidthCm: 60,
  pattern: 'straight',
  wasteMarginPercent: 10,
  boxCoverageM2: 2.16,
});
console.log('1. Piso:', {
  netArea: floorRes.netAreaM2,
  pieces: floorRes.recommendedPieceCount,
  boxes: floorRes.boxesEstimated,
});
if (floorRes.netAreaM2 !== 20 || floorRes.recommendedPieceCount !== 62 || floorRes.boxesEstimated !== 11) {
  throw new Error(`Falha no cálculo de piso! Esperado 20m², 62 peças, 11 caixas. Recebido: ${JSON.stringify(floorRes)}`);
}

// 2. Tijolos
const brickRes = calculateBricks({
  brickType: 'baiano_8',
  jointThicknessCm: 1.5,
  walls: [{ id: 'w1', name: 'P1', width: 5.0, height: 2.8, unit: 'm' }],
  openings: [{ id: 'op1', type: 'door', name: 'Porta', width: 0.8, height: 2.1, quantity: 1, unit: 'm' }],
  wasteMarginPercent: 10,
});
console.log('2. Tijolos:', {
  netWallArea: brickRes.netWallAreaM2,
  bricks: brickRes.recommendedBrickCount,
  mortarBags: brickRes.mortarBagsEstimate20kg,
});
if (brickRes.netWallAreaM2 <= 0 || brickRes.recommendedBrickCount <= 0) {
  throw new Error('Falha no cálculo de tijolos!');
}

// 3. Tinta
const paintRes = calculatePaint({
  mode: 'simple_room',
  roomLength: 4,
  roomWidth: 3.5,
  wallHeight: 2.8,
  includeCeiling: true,
  walls: [],
  openings: [],
  directAreaM2: 0,
  paintType: 'standard',
  coats: 2,
  wasteMarginPercent: 5,
});
console.log('3. Tinta:', {
  netArea: paintRes.totalNetPaintingAreaM2,
  liters: paintRes.recommendedLiters,
  packaging: paintRes.packaging,
});
if (paintRes.recommendedLiters <= 0 || paintRes.packaging.totalLitersPackaged <= 0) {
  throw new Error('Falha no cálculo de tinta!');
}

// 4. Concreto
const concreteRes = calculateConcrete({
  elementType: 'slab',
  lengthM: 8,
  widthM: 5,
  thicknessCm: 10,
  quantity: 1,
  directVolumeM3: 0,
  strengthType: 'structural_25mpa',
  wasteMarginPercent: 5,
});
console.log('4. Concreto:', {
  volume: concreteRes.totalVolumeWithWasteM3,
  cementBags: concreteRes.cementBags50kg,
  sandM3: concreteRes.sandM3,
  gravelM3: concreteRes.gravelM3,
});
if (concreteRes.totalVolumeWithWasteM3 !== 4.2 || concreteRes.cementBags50kg !== 30) {
  throw new Error(`Falha no concreto! Esperado 4.2m³ e 30 sacos. Recebido: ${JSON.stringify(concreteRes)}`);
}

// 5. Cimento
const cementRes = calculateCement({
  serviceType: 'contrapiso',
  areaM2: 30,
  thicknessCm: 3.5,
  wasteMarginPercent: 10,
});
console.log('5. Cimento:', {
  cementBags: cementRes.cementBags50kg,
  sandM3: cementRes.sandM3,
});
if (cementRes.cementBags50kg <= 0) {
  throw new Error('Falha no cálculo de cimento!');
}

// 6. Argamassa
const mortarRes = calculateMortar({
  mortarType: 'ac2',
  areaM2: 25,
  bondingMethod: 'double',
  wasteMarginPercent: 5,
});
console.log('6. Argamassa:', {
  bags20kg: mortarRes.bags20kg,
  weightKg: mortarRes.totalWeightKg,
});
if (mortarRes.bags20kg <= 0) {
  throw new Error('Falha no cálculo de argamassa!');
}

// 7. Telhas
const roofRes = calculateRoof({
  inputMode: 'projection',
  houseLengthM: 10,
  houseWidthM: 7,
  eavesM: 0.6,
  slopePercent: 35,
  realRoofAreaM2: 0,
  tileModel: 'romana',
  roofWaterCount: 2,
  wasteMarginPercent: 5,
});
console.log('7. Telhas:', {
  realArea: roofRes.realInclinedAreaM2,
  tiles: roofRes.recommendedTileCount,
  ridgeTiles: roofRes.ridgeTilesCount,
});
if (roofRes.recommendedTileCount <= 0 || roofRes.realInclinedAreaM2 <= 0) {
  throw new Error('Falha no cálculo de telhas!');
}

// 8. Rejunte
const groutRes = calculateGrout({
  areaM2: 25,
  pieceLengthMm: 600,
  pieceWidthMm: 600,
  pieceThicknessMm: 8,
  jointWidthMm: 2,
  groutType: 'cimenticio',
  wasteMarginPercent: 10,
});
console.log('8. Rejunte:', {
  totalWeightKg: groutRes.totalWeightKg,
  packages5kg: groutRes.packages5kg,
  packages1kg: groutRes.packages1kg,
});
if (groutRes.totalWeightKg <= 0) {
  throw new Error('Falha no cálculo de rejunte!');
}

// 9. Rodapé
const baseboardRes = calculateBaseboard({
  mode: 'room_dimensions',
  roomLengthM: 4.5,
  roomWidthM: 3.5,
  perimeterDirectM: 0,
  doorCount: 1,
  doorWidthM: 0.8,
  barLengthM: 2.4,
  wasteMarginPercent: 10,
});
console.log('9. Rodapé:', {
  netPerimeter: baseboardRes.netPerimeterM,
  barsNeeded: baseboardRes.barsNeeded,
});
if (baseboardRes.barsNeeded !== 7) {
  throw new Error(`Falha no rodapé! Esperado 7 barras. Recebido: ${baseboardRes.barsNeeded}`);
}

// 10. Massa Corrida
const spackleRes = calculateSpackle({
  areaM2: 40,
  spackleType: 'pva',
  wallCondition: 'reboco_novo',
  coats: 2,
  wasteMarginPercent: 5,
});
console.log('10. Massa Corrida:', {
  barrels25kg: spackleRes.barrels25kg,
  weightKg: spackleRes.totalWeightKg,
});
if (spackleRes.barrels25kg <= 0) {
  throw new Error('Falha no cálculo de massa corrida!');
}

console.log('✅ TODOS OS 10 TESTES DE CÁLCULO PASSARAM COM SUCESSO E PRECISÃO!');
