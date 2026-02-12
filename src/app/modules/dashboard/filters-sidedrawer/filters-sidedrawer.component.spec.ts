import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersSidedrawerComponent } from './filters-sidedrawer.component';

describe('FiltersSidedrawerComponent', () => {
  let component: FiltersSidedrawerComponent;
  let fixture: ComponentFixture<FiltersSidedrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersSidedrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersSidedrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
