export interface Truffle {
  id: string;
  name: string;
  description: string;
  seasonStartMonth?: number; // 1-12
  seasonEndMonth?: number;   // 1-12
  imageUrl?: string;
  // Optional per-truffle size ranges in grams
  // Use null/undefined for open-ended ranges (e.g., min=null => "sotto Xg", max=null => "da Xg in su")
  sizeRanges?: {
    piccolo?: { min?: number | null; max?: number | null };
    medio?: { min?: number | null; max?: number | null };
    grande?: { min?: number | null; max?: number | null };
    moltoGrande?: { min?: number | null; max?: number | null };
  };
}
