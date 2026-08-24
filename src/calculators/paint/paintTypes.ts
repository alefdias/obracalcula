import { WallItem, OpeningItem } from '../../components/common/WallInputsList';

export type PaintType = 'standard' | 'premium' | 'economica' | 'esmalte' | 'epoxi' | 'teto';

export interface PaintInputs {
  mode: 'simple_room' | 'custom_walls' | 'direct_area';
  // simple room
  roomLength: number;
  roomWidth: number;
  wallHeight: number;
  includeCeiling: boolean;
  // custom walls
  walls: WallItem[];
  openings: OpeningItem[];
  // direct area
  directAreaM2: number;
  // paint specs
  paintType: PaintType;
  coats: number; // demãos (e.g. 2)
  customYieldM2PerLiter?: number;
  wasteMarginPercent: number; // 5 or 10
}

export interface CommercialPaintPacks {
  cans18L: number;
  gallons3_6L: number;
  quarts0_9L: number;
  totalLitersPackaged: number;
}

export interface PaintCalculationResult {
  wallsGrossAreaM2: number;
  ceilingAreaM2: number;
  openingsDeductionM2: number;
  totalNetPaintingAreaM2: number;
  totalAreaWithCoatsM2: number;
  paintYieldPerLiter: number;
  exactLitersNeeded: number;
  recommendedLiters: number;
  packaging: CommercialPaintPacks;
  wasteMarginUsed: number;
}
