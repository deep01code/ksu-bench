import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartialPoComponent } from './add-partial-po.component';

describe('AddPartialPoComponent', () => {
  let component: AddPartialPoComponent;
  let fixture: ComponentFixture<AddPartialPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartialPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartialPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
