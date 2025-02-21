import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingRoleFormComponent } from './billing-role-form.component';

describe('BillingRoleFormComponent', () => {
  let component: BillingRoleFormComponent;
  let fixture: ComponentFixture<BillingRoleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingRoleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
