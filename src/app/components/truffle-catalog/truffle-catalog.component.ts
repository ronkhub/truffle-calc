import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TruffleService } from '../../services';

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
  
  readonly truffles = this.truffleService.truffles;
}
