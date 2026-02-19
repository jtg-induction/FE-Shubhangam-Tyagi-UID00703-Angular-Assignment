import { ValidationErrors } from '@angular/forms';

export class ErrorParser {
  private static errorMap: Record<string, (errorValue: unknown, label?: string) => string> = {
    required: (_, label) => `${label} is required`,

    email: () => 'Please enter a valid email',

    minlength: errorValue => {
      const error = errorValue as {
        requiredLength: number;
      };
      return `Minimum ${error.requiredLength} characters required`;
    },

    atLeastTwoDigitsRequired: () => 'Password must contain at least two digits',

    atLeastTwoSpecialChars: () => 'At least two special characters required',

    passwordNoMatch: () => 'Passwords do not match',
  };

  static parse(errors: ValidationErrors, label?: string): string {
    const firstErrorKey = Object.keys(errors)[0];

    const errorFn = this.errorMap[firstErrorKey];

    return errorFn ? errorFn(errors[firstErrorKey], label) : '';
  }
}
