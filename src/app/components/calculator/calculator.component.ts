import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TruffleService, SizeTierService, PriceCalculatorService, CalculationResult } from '../../services';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  private truffleService = inject(TruffleService);
  private sizeTierService = inject(SizeTierService);
  private priceCalculatorService = inject(PriceCalculatorService);

  selectedTruffleId = signal<string>('');
  weight = signal<number>(0);
  result = signal<CalculationResult | null>(null);

  readonly truffles = this.truffleService.truffles;
  readonly sizeTiers = this.sizeTierService.sizeTiers;

  readonly currentSizeTier = computed(() => {
    const w = this.weight();
    return this.sizeTierService.getSizeTierForWeight(w);
  });

  onTruffleChange(truffleId: string): void {
    this.selectedTruffleId.set(truffleId);
    this.calculate();
  }

  onWeightInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const weight = input.valueAsNumber || 0;
    this.onWeightChange(weight);
  }

  onWeightChange(weight: number): void {
    this.weight.set(weight);
    this.calculate();
  }

  calculate(): void {
    const truffleId = this.selectedTruffleId();
    const weight = this.weight();

    if (truffleId && weight > 0) {
      const calcResult = this.priceCalculatorService.calculatePrice(truffleId, weight);
      this.result.set(calcResult);
    } else {
      this.result.set(null);
    }
  }

  reset(): void {
    this.selectedTruffleId.set('');
    this.weight.set(0);
    this.result.set(null);
  }
}
