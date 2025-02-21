import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorV2Component } from './vendor-v2.component';

describe('VendorV2Component', () => {
  let component: VendorV2Component;
  let fixture: ComponentFixture<VendorV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
