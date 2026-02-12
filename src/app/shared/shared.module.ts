import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [HeaderComponent, LoaderComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [HeaderComponent, LoaderComponent],
})
export class SharedModule {}
