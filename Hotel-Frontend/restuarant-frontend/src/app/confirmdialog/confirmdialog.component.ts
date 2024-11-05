import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrl: './confirmdialog.component.css'
})
export class ConfirmdialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { message: string ,isWarning: boolean },

  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
