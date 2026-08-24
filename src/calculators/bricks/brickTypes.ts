import { WallItem, OpeningItem } from '../../components/common/WallInputsList';

export type BrickType = 
  | 'baiano_8'
  | 'baiano_6'
  | 'baiano_9'
  | 'bloco_14_39'
  | 'bloco_19_39'
  | 'bloco_9_39'
  | 'macico_5_10_20'
  | 'ecologico_modular'
  | 'custom';

export interface BrickInputs {
  brickType: BrickType;
  customLengthCm?: number;
  customHeightCm?: number;
  customWidthCm?: number;
  jointThicknessCm: number; // e.g. 1.5 cm
  walls: WallItem[];
  openings: OpeningItem[];
  wasteMarginPercent: number; // e.g. 10
}

export interface BrickCalculationResult {
  grossWallAreaM2: number;
  openingsDeductionM2: number;
  netWallAreaM2: number;
  bricksPerM2: number;
  rawBrickCount: number;
  recommendedBrickCount: number;
  wasteMarginUsed: number;
  mortarBagsEstimate20kg: number; // Argamassa de assentamento estimada
  sandVolumeM3: number;           // Se for fazer traço na obra
  cementBags50kg: number;         // Se for traço convencional
}
