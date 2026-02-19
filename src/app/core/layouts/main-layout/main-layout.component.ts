import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  isLoggedIn() {
    const token = localStorage.getItem('Token');
    if (token && token !== '') {
      return true;
    }

    return false;
  }
}
