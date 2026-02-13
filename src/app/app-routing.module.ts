import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { MainLayoutComponent } from '@core/layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('@modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard] },
  {
    path: 'articles',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: ':id',
        loadChildren: () => import('@modules/articles-module/articles-module.module').then(m => m.ArticlesModuleModule),
      },
    ],
    canActivate: [authGuard],
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
