import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '@core/services/notification.service';
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  show = false;
  message!: string;
  type!: string;
  notitficationService: NotificationService = inject(NotificationService);

  constructor() {
    this.notitficationService.snackbarState.pipe(takeUntilDestroyed()).subscribe(state => {
      if (state.type) {
        this.type = state.type;
      } else {
        this.type = 'success';
      }
      this.message = state.message;
      this.show = state.show;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    });
  }
}
