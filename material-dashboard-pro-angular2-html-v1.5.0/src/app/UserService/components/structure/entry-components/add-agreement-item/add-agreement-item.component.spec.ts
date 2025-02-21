import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgreementItemComponent } from './add-agreement-item.component';

describe('AddAgreementItemComponent', () => {
  let component: AddAgreementItemComponent;
  let fixture: ComponentFixture<AddAgreementItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgreementItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgreementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
