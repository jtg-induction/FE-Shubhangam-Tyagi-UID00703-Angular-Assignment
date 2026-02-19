import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';
import { AuthRequest } from '@shared/models/auth.request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  title = 'Login';
  errorMessage = '';
  loginForm!: FormGroup;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  isLoading = false;
  show = false;

  ngOnInit(): void {
    this.setupForm();
  }

  handleSubmit() {
    this.isLoading = true;
    const formData = this.loginForm.getRawValue();
    const loginRequest: AuthRequest = {
      username: formData.username,
      password: formData.password,
    };
    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.router.navigate(['/articles']);
      },
      error: error => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
      },
      complete: () => {
        this.errorMessage = '';
        this.isLoading = false;
      },
    });
  }

  setupForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        PasswordValidator.atLeastTwoDigitsRequired,
        PasswordValidator.atLeastTwoSpecialChars,
      ]),
    });
  }

  togglePasswordShow() {
    this.show = !this.show;
  }
  hidePass() {
    this.show = false;
  }
}
