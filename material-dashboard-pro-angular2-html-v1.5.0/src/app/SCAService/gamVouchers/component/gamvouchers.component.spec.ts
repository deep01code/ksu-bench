import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamvouchersComponent } from './gamvouchers.component';

describe('GamvouchersComponent', () => {
  let component: GamvouchersComponent;
  let fixture: ComponentFixture<GamvouchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamvouchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamvouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
