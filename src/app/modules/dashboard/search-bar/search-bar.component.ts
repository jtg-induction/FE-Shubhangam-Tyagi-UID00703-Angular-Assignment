import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output() searchChanged = new EventEmitter<string>();
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.searchChanged.emit(value);
    });
  }
  handleSearch(input: string) {
    console.log('');
    this.searchSubject.next(input);
  }

  // clearSearch() {
  //   this.searchSubject.next('');
  //   console.log('clicked clear search');
  // }
  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
