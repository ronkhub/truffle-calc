import { Injectable } from '@angular/core';
import { TruffleService } from './truffle.service';
import { SizeTierService } from './size-tier.service';
import { PriceHistoryService } from './price-history.service';
import { Truffle, SizeTier } from '../models';

export interface CalculationResult {
  truffle: Truffle;
  sizeTier: SizeTier;
  weight: number;
  unitPrice: number; // EUR per gram (average from history)
  basePrice: number; // unitPrice * weight
  multiplier: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorService {
  constructor(
    private truffleService: TruffleService,
    private sizeTierService: SizeTierService,
    private priceHistoryService: PriceHistoryService
  ) {}

  calculatePrice(truffleId: string, weight: number): CalculationResult | null {
    const truffle = this.truffleService.getTruffleById(truffleId);
    if (!truffle) {
      return null;
    }

    const sizeTier = this.sizeTierService.getSizeTierForWeight(weight);
    if (!sizeTier) {
      return null;
    }

    const avg = this.priceHistoryService.getAverageUnitPrice(truffleId);
    const unitPrice = avg ?? 0;
    const basePrice = unitPrice * weight;
    const totalPrice = basePrice * sizeTier.priceMultiplier;

    return {
      truffle,
      sizeTier,
      weight,
      unitPrice,
      basePrice,
      multiplier: sizeTier.priceMultiplier,
      totalPrice
    };
  }
}
