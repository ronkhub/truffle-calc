import { Injectable, signal } from '@angular/core';
import { SizeTier } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SizeTierService {
  private sizeTiersSignal = signal<SizeTier[]>([
    {
      id: '1',
      name: 'Small',
      minWeight: 0,
      maxWeight: 20,
      priceMultiplier: 0.9
    },
    {
      id: '2',
      name: 'Medium',
      minWeight: 20,
      maxWeight: 50,
      priceMultiplier: 1.0
    },
    {
      id: '3',
      name: 'Large',
      minWeight: 50,
      maxWeight: 100,
      priceMultiplier: 1.15
    },
    {
      id: '4',
      name: 'Extra Large',
      minWeight: 100,
      maxWeight: 200,
      priceMultiplier: 1.35
    },
    {
      id: '5',
      name: 'Premium',
      minWeight: 200,
      maxWeight: Infinity,
      priceMultiplier: 1.5
    }
  ]);

  readonly sizeTiers = this.sizeTiersSignal.asReadonly();

  getSizeTierForWeight(weight: number): SizeTier | undefined {
    return this.sizeTiersSignal().find(
      tier => weight >= tier.minWeight && weight < tier.maxWeight
    );
  }

  getSizeTierById(id: string): SizeTier | undefined {
    return this.sizeTiersSignal().find(t => t.id === id);
  }

  addSizeTier(tier: SizeTier): void {
    this.sizeTiersSignal.update(current => [...current, tier]);
  }

  updateSizeTier(tier: SizeTier): void {
    this.sizeTiersSignal.update(current =>
      current.map(t => t.id === tier.id ? tier : t)
    );
  }

  deleteSizeTier(id: string): void {
    this.sizeTiersSignal.update(current => current.filter(t => t.id !== id));
  }
}
