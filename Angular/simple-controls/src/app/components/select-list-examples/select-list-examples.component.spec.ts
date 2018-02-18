import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListExamplesComponent } from './select-list-examples.component';

describe('SelectListExamplesComponent', () => {
  let component: SelectListExamplesComponent;
  let fixture: ComponentFixture<SelectListExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectListExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectListExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
