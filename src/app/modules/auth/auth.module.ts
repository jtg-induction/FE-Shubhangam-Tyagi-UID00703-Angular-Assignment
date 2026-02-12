import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconButton, SharedModule],
})
export class AuthModule {}
