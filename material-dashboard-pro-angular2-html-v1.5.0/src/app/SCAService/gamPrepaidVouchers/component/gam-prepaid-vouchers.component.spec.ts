import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamPrepaidVouchersComponent } from './gam-prepaid-vouchers.component';

describe('GamPrepaidVouchersComponent', () => {
  let component: GamPrepaidVouchersComponent;
  let fixture: ComponentFixture<GamPrepaidVouchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamPrepaidVouchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamPrepaidVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
