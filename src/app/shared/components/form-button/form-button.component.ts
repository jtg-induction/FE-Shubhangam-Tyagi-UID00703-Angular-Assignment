import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrl: './form-button.component.scss',
})
export class FormButtonComponent {
  @Input() type!: string;
  @Input() isDisabled!: boolean;
  @Input() text!: string;
  @Input() color!: string;
  @Input() isLoading!: boolean;
}
