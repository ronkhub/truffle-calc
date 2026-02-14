import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatOptionModule } from '@angular/material/core';
import { Truffle } from '../../models';
import { PriceHistoryService } from '../../services/price-history.service';
import { SizeTierService } from '../../services/size-tier.service';
import { PriceHistory } from '../../models/price-history.model';

interface DialogData {
  truffle: Truffle | null;
}

@Component({
  selector: 'app-truffle-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatOptionModule
  ],
  templateUrl: './truffle-dialog.component.html',
  styleUrls: ['./truffle-dialog.component.scss']
})
export class TruffleDialogComponent {
  private fb = inject(FormBuilder);
  private ref = inject(MatDialogRef<TruffleDialogComponent, Truffle | undefined>);
  private priceHistory = inject(PriceHistoryService);
  private sizeTierService = inject(SizeTierService);

  months = [
    { value: 1, label: 'Gennaio' },
    { value: 2, label: 'Febbraio' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Aprile' },
    { value: 5, label: 'Maggio' },
    { value: 6, label: 'Giugno' },
    { value: 7, label: 'Luglio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Settembre' },
    { value: 10, label: 'Ottobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Dicembre' }
  ];

  // mapping keys used in the UI to human labels stored in PriceHistory.sizeTier
  sizeLabels: Record<string,string> = { piccolo: 'Piccolo', medio: 'Medio', grande: 'Grande', moltoGrande: 'Molto grande' };

  selectedSizeTierId: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    const t = data.truffle;
    this.form.patchValue({
      id: t?.id ?? '',
      name: t?.name ?? '',
      description: t?.description ?? '',
      seasonStartMonth: t?.seasonStartMonth ?? null,
      seasonEndMonth: t?.seasonEndMonth ?? null,
    });
    if (t?.sizeRanges) {
      this.form.patchValue({
        sizeRanges: {
          piccolo: { min: t.sizeRanges.piccolo?.min ?? null, max: t.sizeRanges.piccolo?.max ?? null },
          medio: { min: t.sizeRanges.medio?.min ?? null, max: t.sizeRanges.medio?.max ?? null },
          grande: { min: t.sizeRanges.grande?.min ?? null, max: t.sizeRanges.grande?.max ?? null },
          moltoGrande: { min: t.sizeRanges.moltoGrande?.min ?? null, max: t.sizeRanges.moltoGrande?.max ?? null }
        }
      });
    }
  }

  form = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: [''],
    seasonStartMonth: [null as number | null],
    seasonEndMonth: [null as number | null],
    sizeRanges: this.fb.group({
      piccolo: this.fb.group({ min: [null as number | null], max: [null as number | null] }),
      medio: this.fb.group({ min: [null as number | null], max: [null as number | null] }),
      grande: this.fb.group({ min: [null as number | null], max: [null as number | null] }),
      moltoGrande: this.fb.group({ min: [null as number | null], max: [null as number | null] }),
    })
  });

  cancel() { this.ref.close(undefined); }

  save() {
    if (this.form.invalid) return;
    const value = this.form.value as unknown as Truffle;
    this.ref.close(value);
  }

  get sizeTiers() {
    return this.sizeTierService.sizeTiers();
  }

  getPrices(): PriceHistory[] {
    if (!this.form.value.id) return [];
    return this.priceHistory.getHistoryForTruffle(this.form.value.id);
  }

  addPrice(entry: { sizeTierId: string; price: number; date: string }) {
    if (!this.form.value.id) return;
    const labels = this.sizeLabels;
    const ph: PriceHistory = {
      id: crypto.randomUUID(),
      truffleId: this.form.value.id,
      truffleName: this.form.value.name || '',
      basePrice: entry.price,
      timestamp: new Date(entry.date || Date.now()),
      sizeTier: labels[entry.sizeTierId]
    } as any;
    this.priceHistory.addPriceHistory(ph);
  }

  onSizeChange(value: string | null) {
    this.selectedSizeTierId = value;
  }

  filteredPrices(): PriceHistory[] {
    if (!this.form.value.id || !this.selectedSizeTierId) return [];
    const label = this.sizeLabels[this.selectedSizeTierId];
    return this.getPrices()
      .filter(p => (p.sizeTier || '') === label)
      .slice()
      .sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
}
