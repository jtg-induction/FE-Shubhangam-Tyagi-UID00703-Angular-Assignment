import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth-service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';
import { AuthMessages } from '@shared/messages/auth-messages';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '@core/services/token-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  title = 'Signup';
  errorMessage = '';
  signupForm!: FormGroup;
  authService: AuthService = inject(AuthService);
  tokenService: TokenService = inject(TokenService);
  router: Router = inject(Router);
  obs!: Subscription;
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8), PasswordValidator.atLeastTwoDigitsRequired]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      { validators: [PasswordValidator.confirmPassword] } // form group level validator
    );
  }
  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }

  handleSubmit() {
    this.obs = this.authService.signup(this.signupForm).subscribe({
      next: resp => {
        console.log(resp.data);
        this.tokenService.saveToken(resp.data.token);
      },
      error: error => {
        if (error.status === 409) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = AuthMessages.unexpectedErrorMessage;
        }
        this.showErrorSnackBar(this.errorMessage);
      },
      complete: () => {
        console.log('completed');
        setTimeout(() => {
          this.router.navigate(['../login']);
        }, 1000);
      },
    });
    // console.log(this.signupForm);
  }

  showErrorSnackBar(message: string) {
    this.snackBar.open(message || 'Signup failed', 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
