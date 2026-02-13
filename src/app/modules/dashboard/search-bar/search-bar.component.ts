import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() searchChanged = new EventEmitter<string>();

  handleSearch(input: string) {
    if (input) {
      this.searchChanged.emit(input);
    }
  }

  clearSearch() {
    console.log('clicked clear search');
  }
}
