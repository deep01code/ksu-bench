import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertAgreementComponent } from './upsert-agreement.component';

describe('UpsertAgreementComponent', () => {
  let component: UpsertAgreementComponent;
  let fixture: ComponentFixture<UpsertAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
