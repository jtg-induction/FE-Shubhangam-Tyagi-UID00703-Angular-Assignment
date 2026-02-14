import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@shared/components/snackbar/snackbar.component';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  snackBar = inject(MatSnackBar);

  showErrorSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 5000,
      panelClass: ['error-notification'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showSuccessSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 300,
      panelClass: ['success-notification'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
