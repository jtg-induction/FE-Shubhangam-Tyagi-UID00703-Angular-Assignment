import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters-sidedrawer',
  templateUrl: './filters-sidedrawer.component.html',
  styleUrl: './filters-sidedrawer.component.scss',
})
export class FiltersSidedrawerComponent implements OnInit {
  filtersForm!: FormGroup;

  ngOnInit(): void {
    this.filtersForm = new FormGroup({
      tags: new FormControl(''),
      sortBy: new FormControl(''),
      sortOrder: new FormControl(''),
      author: new FormControl(''),
    });
  }

  handleSubmit() {
    console.log(this.filtersForm);
  }
}
