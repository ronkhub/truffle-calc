import { Injectable, signal } from '@angular/core';
import { PriceHistory } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PriceHistoryService {
  private priceHistorySignal = signal<PriceHistory[]>([
    {
      id: '1',
      truffleId: '1',
      truffleName: 'Black Winter Truffle',
      basePrice: 85,
      timestamp: new Date('2024-01-15'),
      notes: 'Early season price'
    },
    {
      id: '2',
      truffleId: '1',
      truffleName: 'Black Winter Truffle',
      basePrice: 90,
      timestamp: new Date('2024-06-01'),
      notes: 'Mid-year adjustment'
    },
    {
      id: '3',
      truffleId: '1',
      truffleName: 'Black Winter Truffle',
      basePrice: 95,
      timestamp: new Date('2024-11-01'),
      notes: 'Peak season pricing'
    },
    {
      id: '4',
      truffleId: '2',
      truffleName: 'White Alba Truffle',
      basePrice: 320,
      timestamp: new Date('2024-01-15'),
      notes: 'Initial pricing'
    },
    {
      id: '5',
      truffleId: '2',
      truffleName: 'White Alba Truffle',
      basePrice: 350,
      timestamp: new Date('2024-09-01'),
      notes: 'Peak season adjustment'
    }
  ]);

  readonly priceHistory = this.priceHistorySignal.asReadonly();

  getHistoryForTruffle(truffleId: string): PriceHistory[] {
    return this.priceHistorySignal()
      .filter(h => h.truffleId === truffleId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  addPriceHistory(entry: PriceHistory): void {
    this.priceHistorySignal.update(current => [...current, entry]);
  }

  clearHistoryForTruffle(truffleId: string): void {
    this.priceHistorySignal.update(current => 
      current.filter(h => h.truffleId !== truffleId)
    );
  }
}
