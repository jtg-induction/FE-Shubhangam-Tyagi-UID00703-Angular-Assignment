import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
  private static readonly TWO_DIGITS_REGEX = /(?:.*\d){2,}/;
  private static readonly TWO_SPECIAL_REGEX = /(?:.*[!@#$%]){2,}/;

  static atLeastTwoDigitsRequired(control: AbstractControl): ValidationErrors | null {
    const value = control.value ?? '';

    return PasswordValidator.TWO_DIGITS_REGEX.test(value) ? null : { atLeastTwoDigitsRequired: true };
  }

  static atLeastTwoSpecialChars(control: AbstractControl): ValidationErrors | null {
    const value = control.value ?? '';

    return PasswordValidator.TWO_SPECIAL_REGEX.test(value) ? null : { atLeastTwoSpecialChars: true };
  }

  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }
    if (password === confirmPassword) {
      return null;
    }
    control.get('confirmPassword')?.setErrors({ passwordNoMatch: true });
    return password === confirmPassword ? null : { passwordNoMatch: true };
  }
}
