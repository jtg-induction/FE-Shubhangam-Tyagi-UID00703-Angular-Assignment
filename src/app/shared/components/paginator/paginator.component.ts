import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() totalItems?: number;
  @Input() pageSize?: number;
  @Input() pageNumber?: number;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  pageSizeOptions = [5, 10, 15, 20, 25];

  getServerData(event: PageEvent) {
    console.log('from event');
    console.log(event);
    this.pageChanged.emit(event);
  }
}
