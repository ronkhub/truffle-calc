import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TruffleService, PriceHistoryService, SizeTierService } from '../../services';

@Component({
  selector: 'app-truffle-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './truffle-catalog.component.html',
  styleUrl: './truffle-catalog.component.scss'
})
export class TruffleCatalogComponent {
  private truffleService = inject(TruffleService);
  private priceHistoryService = inject(PriceHistoryService);
  private sizeTierService = inject(SizeTierService);

  readonly truffles = this.truffleService.truffles;

  avgUnitPrice(id: string): number | null {
    return this.priceHistoryService.getAverageUnitPrice(id);
  }

  monthName(m?: number): string {
    if (!m) return '';
    const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    return months[(m - 1) % 12];
  }

  sizeTiers() {
    return this.sizeTierService.sizeTiers();
  }

  priceHistoryFor(truffleId: string) {
    return this.priceHistoryService.getHistoryForTruffle(truffleId);
  }

  lastPriceFor(truffleId: string, label: string): number | null {
    const list = this.priceHistoryService.getHistoryForTruffle(truffleId);
    const last = list.find(p => p.sizeTier === label);
    return last ? last.basePrice : null;
  }

  rangeFor(truffle: any, key: string) {
    return truffle.sizeRanges?.[key] ?? null;
  }
}
