import { Injectable, signal, computed } from '@angular/core';
import { Truffle } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TruffleService {
  private trufflesSignal = signal<Truffle[]>([
    {
      id: '1',
      name: 'Black Winter Truffle',
      description: 'Also known as Périgord truffle, prized for its intense aroma and flavor',
      basePrice: 95,
      origin: 'France',
      season: 'November - March'
    },
    {
      id: '2',
      name: 'White Alba Truffle',
      description: 'The most valuable truffle, known for its pungent, garlicky aroma',
      basePrice: 350,
      origin: 'Italy',
      season: 'September - December'
    },
    {
      id: '3',
      name: 'Summer Truffle',
      description: 'Milder flavor, perfect for everyday dishes',
      basePrice: 45,
      origin: 'Europe',
      season: 'May - August'
    },
    {
      id: '4',
      name: 'Burgundy Truffle',
      description: 'Autumn variety with earthy, hazelnut notes',
      basePrice: 65,
      origin: 'France',
      season: 'September - November'
    },
    {
      id: '5',
      name: 'Oregon Black Truffle',
      description: 'North American variety with fruity, earthy flavor',
      basePrice: 40,
      origin: 'USA',
      season: 'December - March'
    }
  ]);

  readonly truffles = this.trufflesSignal.asReadonly();

  getTruffleById(id: string): Truffle | undefined {
    return this.trufflesSignal().find(t => t.id === id);
  }

  addTruffle(truffle: Truffle): void {
    this.trufflesSignal.update(current => [...current, truffle]);
  }

  updateTruffle(truffle: Truffle): void {
    this.trufflesSignal.update(current =>
      current.map(t => t.id === truffle.id ? truffle : t)
    );
  }

  deleteTruffle(id: string): void {
    this.trufflesSignal.update(current => current.filter(t => t.id !== id));
  }
}
