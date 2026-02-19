import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from '@shared/models/auth.request.model';
import { AuthService } from '@core/services/auth.service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  title = 'Signup';
  errorMessage = '';
  signupForm!: FormGroup;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  isLoading = false;
  showPass = false;
  showConfirmPass = false;

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.signupForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          PasswordValidator.atLeastTwoDigitsRequired,
          PasswordValidator.atLeastTwoSpecialChars,
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: [PasswordValidator.confirmPassword] } // form group level validator
    );
  }

  handleSubmit() {
    this.isLoading = true;
    const formData = this.signupForm.getRawValue();
    const signupRequest: AuthRequest = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    this.authService.signup(signupRequest).subscribe({
      next: () => {
        this.router.navigate(['/articles']);
      },
      error: error => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.errorMessage = '';
      },
    });
  }

  togglePasswordShow() {
    this.showPass = !this.showPass;
  }
  toggleConfirmPasswordShow() {
    this.showConfirmPass = !this.showConfirmPass;
  }
  hidePass() {
    this.showPass = false;
  }
  hideConfirmPass() {
    this.showConfirmPass = false;
  }
}
