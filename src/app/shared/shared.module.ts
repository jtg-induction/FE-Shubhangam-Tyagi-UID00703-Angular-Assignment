import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header/header.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { ControlErrorPipe } from './pipes/ControlErrorPipe';

@NgModule({
  declarations: [HeaderComponent, FormButtonComponent, ControlErrorPipe],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [HeaderComponent, FormButtonComponent, ControlErrorPipe],
})
export class SharedModule {}
