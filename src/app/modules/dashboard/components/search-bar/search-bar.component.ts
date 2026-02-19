import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  @Input() searchText?: string;
  @Output() searchChanged = new EventEmitter<string>();
  private searchSubject = new Subject<string>();
  destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(), // Only emit if value is different
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.searchChanged.emit(value);
      });
  }

  handleSearch(input: string) {
    this.searchSubject.next(input);
  }
}
