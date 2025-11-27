import { Injectable, computed, signal } from '@angular/core';
import { TruffleService } from './truffle.service';
import { SizeTierService } from './size-tier.service';
import { Truffle, SizeTier } from '../models';

export interface CalculationResult {
  truffle: Truffle;
  sizeTier: SizeTier;
  weight: number;
  basePrice: number;
  multiplier: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorService {
  constructor(
    private truffleService: TruffleService,
    private sizeTierService: SizeTierService
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

    const basePrice = truffle.basePrice * weight;
    const totalPrice = basePrice * sizeTier.priceMultiplier;

    return {
      truffle,
      sizeTier,
      weight,
      basePrice,
      multiplier: sizeTier.priceMultiplier,
      totalPrice
    };
  }
}
