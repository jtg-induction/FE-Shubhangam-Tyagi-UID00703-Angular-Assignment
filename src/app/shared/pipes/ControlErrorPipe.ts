import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'controlError',
  pure: false,
})
export class ControlErrorPipe implements PipeTransform {
  transform(control: AbstractControl | null, label: string): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) return `${label} is required`;
    if (errors['email']) return 'Please enter a valid email';
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required`;
    if (errors['atLeastTwoDigitsRequired']) return 'Password must contain at least two digits';
    if (errors['atLeastTwoSpecialChars']) return 'Atleast two special characters required'; // Fixed to match your validator
    if (errors['passwordNoMatch']) return 'Passwords do not match';

    return '';
  }
}
