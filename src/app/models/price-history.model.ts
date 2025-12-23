export interface PriceHistory {
  id: string;
  truffleId: string;
  truffleName: string;
  basePrice: number;
  timestamp: Date;
  notes?: string;
  // Optional pezzatura name or id
  sizeTier?: string;
}
