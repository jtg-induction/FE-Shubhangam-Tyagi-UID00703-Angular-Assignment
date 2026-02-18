import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ArticleDetailsPageComponent } from './pages/article-details-page/article-details-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: ':id', component: ArticleDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
