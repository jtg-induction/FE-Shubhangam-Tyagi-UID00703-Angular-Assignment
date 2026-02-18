import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { ControlErrorPipe } from './pipes/ControlErrorPipe';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [FormButtonComponent, ControlErrorPipe, SnackbarComponent],
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [FormButtonComponent, SnackbarComponent, ControlErrorPipe],
})
export class SharedModule {}
