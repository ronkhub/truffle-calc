import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TruffleService } from '../../services';
import { Truffle } from '../../models';
import { TruffleDialogComponent } from './truffle-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
  selector: 'app-truffle-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    TruffleDialogComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './truffle-admin.component.html',
  styleUrl: './truffle-admin.component.scss'
})
export class TruffleAdminComponent {
  private truffleService = inject(TruffleService);
  private dialog = inject(MatDialog);
  readonly truffles = this.truffleService.truffles;
  displayedColumns = ['name', 'season', 'actions'];

  openAddDialog() {
    const dialogRef = this.dialog.open(TruffleDialogComponent, {
      width: '520px',
      data: { truffle: null }
    });
    dialogRef.afterClosed().subscribe((result: Truffle | undefined) => {
      if (result) {
        result.id = crypto.randomUUID();
        this.truffleService.addTruffle(result);
      }
    });
  }

  openEditDialog(truffle: Truffle) {
    const dialogRef = this.dialog.open(TruffleDialogComponent, {
      width: '520px',
      data: { truffle }
    });
    dialogRef.afterClosed().subscribe((result: Truffle | undefined) => {
      if (result) {
        this.truffleService.updateTruffle(result);
      }
    });
  }

  confirmDelete(truffle: Truffle) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Conferma eliminazione',
        message: `Eliminare "${truffle.name}"?`,
        confirmText: 'Elimina',
        cancelText: 'Annulla'
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.truffleService.deleteTruffle(truffle.id);
      }
    });
  }
}
