import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TruffleService, PriceHistoryService } from '../../services';

@Component({
  selector: 'app-price-history',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './price-history.component.html',
  styleUrl: './price-history.component.scss'
})
export class PriceHistoryComponent {
  private truffleService = inject(TruffleService);
  private priceHistoryService = inject(PriceHistoryService);

  readonly truffles = this.truffleService.truffles;
  
  selectedTruffleId = signal<string>('');

  readonly filteredHistory = computed(() => {
    const id = this.selectedTruffleId();
    if (!id) {
      return this.priceHistoryService.priceHistory();
    }
    return this.priceHistoryService.getHistoryForTruffle(id);
  });

  onTruffleChange(truffleId: string): void {
    this.selectedTruffleId.set(truffleId);
  }
}
