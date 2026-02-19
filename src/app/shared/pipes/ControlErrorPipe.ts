import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorParser } from '@shared/utils/error-parser';

@Pipe({
  name: 'controlError',
  pure: false,
})
export class ControlErrorPipe implements PipeTransform {
  transform(control: AbstractControl | null, label: string): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }
    // const errors = control.errors ?? control.parent?.errors;
    return ErrorParser.parse(control.errors, label);
  }
}
