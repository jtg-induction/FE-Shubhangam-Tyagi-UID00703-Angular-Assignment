import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from './components/header/header.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { ControlErrorPipe } from './pipes/ControlErrorPipe';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [HeaderComponent, FormButtonComponent, ControlErrorPipe, PaginatorComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule],
  exports: [HeaderComponent, FormButtonComponent, PaginatorComponent, ControlErrorPipe],
})
export class SharedModule {}
