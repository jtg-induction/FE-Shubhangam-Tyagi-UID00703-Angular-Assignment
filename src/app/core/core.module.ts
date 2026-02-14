import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

@NgModule({
  declarations: [MainLayoutComponent, AuthLayoutComponent],
  imports: [CommonModule, HttpClientModule, RouterOutlet, SharedModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class CoreModule {}
