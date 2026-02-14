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
      seasonStartMonth: 11,
      seasonEndMonth: 3
    },
    {
      id: '2',
      name: 'White Alba Truffle',
      description: 'The most valuable truffle, known for its pungent, garlicky aroma',
      seasonStartMonth: 9,
      seasonEndMonth: 12
    },
    {
      id: '3',
      name: 'Summer Truffle',
      description: 'Milder flavor, perfect for everyday dishes',
      seasonStartMonth: 5,
      seasonEndMonth: 8
    },
    {
      id: '4',
      name: 'Burgundy Truffle',
      description: 'Autumn variety with earthy, hazelnut notes',
      seasonStartMonth: 9,
      seasonEndMonth: 11
    },
    {
      id: '5',
      name: 'Oregon Black Truffle',
      description: 'North American variety with fruity, earthy flavor',
      seasonStartMonth: 12,
      seasonEndMonth: 3
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
