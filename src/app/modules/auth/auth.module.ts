import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconButton],
})
export class AuthModule {}
