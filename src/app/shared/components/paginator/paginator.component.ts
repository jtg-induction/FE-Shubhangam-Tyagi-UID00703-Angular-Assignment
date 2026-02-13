import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnInit {
  @Input() totalItems?: number;
  @Input() pageSize?: number;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  pageSizeOptions = [5, 10, 15, 20];
  ngOnInit(): void {
    this.pageSize = 10;
  }

  getServerData(event: PageEvent) {
    this.pageChanged.emit(event);
  }
}
