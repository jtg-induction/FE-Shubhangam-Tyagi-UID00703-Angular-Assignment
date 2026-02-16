import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Notification } from '@shared/models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackbarSubject = new Subject<Notification>();
  public snackbarState = this.snackbarSubject.asObservable();

  showSuccess(message: string) {
    this.snackbarSubject.next({
      show: true,
      message,
      type: 'success',
    });
  }
  showError(message: string) {
    this.snackbarSubject.next({
      show: true,
      message,
      type: 'danger',
    });
  }
}
