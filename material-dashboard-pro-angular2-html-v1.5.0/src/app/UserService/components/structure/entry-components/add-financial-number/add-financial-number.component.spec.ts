import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinancialNumberComponent } from './add-financial-number.component';

describe('AddFinancialNumberComponent', () => {
  let component: AddFinancialNumberComponent;
  let fixture: ComponentFixture<AddFinancialNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFinancialNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFinancialNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
