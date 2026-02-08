import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
  static atLeastTwoDigitsRequired(control: AbstractControl) {
    const password = control.value?.toString() || '';
    let cnt = 0;
    for (const i of password) {
      if (i >= '0' && i <= '9') {
        cnt++;
      }
    }
    if (cnt < 2) {
      return { atLeastTwoDigitsRequired: true };
    }
    return null;
  }

  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value?.toString() || '';
    const confirmPassword = control.get('confirmPassword')?.value?.toString() || '';

    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordNoMatch: true });
      return { passwordNoMatch: true };
    }
    return null;
  }
}
