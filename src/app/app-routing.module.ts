import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { MainLayoutComponent } from '@core/layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'articles', pathMatch: 'full' },
      { path: 'auth', loadChildren: () => import('@modules/auth/auth.module').then(m => m.AuthModule), canActivate: [authGuard] },
      { path: 'articles', loadChildren: () => import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard] },
    ],
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
