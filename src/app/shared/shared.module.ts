import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ControlErrorPipe } from './pipes/ControlErrorPipe';

@NgModule({
  declarations: [FormButtonComponent, LoaderComponent, ControlErrorPipe],
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [FormButtonComponent, LoaderComponent, ControlErrorPipe],
})
export class SharedModule {}
