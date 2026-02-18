import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'; // For <mat-icon>
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ArticleDetailsPageComponent } from './pages/article-details-page/article-details-page.component';
@NgModule({
  declarations: [HomepageComponent, ArticleDetailsPageComponent, ArticleCardComponent, SearchBarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class DashboardModule {}
