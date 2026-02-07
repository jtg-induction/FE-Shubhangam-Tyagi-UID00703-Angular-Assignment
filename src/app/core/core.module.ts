import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from '../modules/dashboard/home-page/home-page.component';

@NgModule({
  declarations: [PageNotFoundComponent, HomePageComponent],
  imports: [CommonModule],
})
export class CoreModule {}
