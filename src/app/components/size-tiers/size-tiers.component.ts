import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SizeTierService } from '../../services';

@Component({
  selector: 'app-size-tiers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './size-tiers.component.html',
  styleUrl: './size-tiers.component.scss'
})
export class SizeTiersComponent {
  private sizeTierService = inject(SizeTierService);
  
  readonly sizeTiers = this.sizeTierService.sizeTiers;
  readonly displayedColumns = ['name', 'range', 'multiplier'];

  formatRange(min: number, max: number): string {
    if (max === Infinity) {
      return `${min}g+`;
    }
    return `${min}g - ${max}g`;
  }
}
