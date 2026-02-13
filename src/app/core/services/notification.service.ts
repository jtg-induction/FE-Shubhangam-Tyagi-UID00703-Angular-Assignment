import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  snackBar = inject(MatSnackBar);

  showErrorSnackBar(message: string) {
    this.snackBar.open(message || 'Signup failed', 'Close', {
      duration: 5000,
      panelClass: ['error-notification'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showSuccessSnackBar(message: string) {
    this.snackBar.open(message || 'Signup Success', undefined, {
      duration: 300,
      panelClass: ['success-notification'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
