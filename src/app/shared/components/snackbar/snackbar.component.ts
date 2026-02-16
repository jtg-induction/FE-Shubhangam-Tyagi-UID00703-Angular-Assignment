import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent implements OnInit, OnDestroy {
  show = false;
  message!: string;
  type!: string;
  private snackbarSubscription?: Subscription;
  notitficationService: NotificationService = inject(NotificationService);

  ngOnInit() {
    this.snackbarSubscription = this.notitficationService.snackbarState.subscribe(state => {
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

  ngOnDestroy() {
    this.snackbarSubscription?.unsubscribe();
  }
}
