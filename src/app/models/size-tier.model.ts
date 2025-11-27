export interface SizeTier {
  id: string;
  name: string;
  minWeight: number; // in grams
  maxWeight: number; // in grams
  priceMultiplier: number;
}
