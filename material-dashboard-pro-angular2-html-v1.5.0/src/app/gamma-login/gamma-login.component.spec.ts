import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GammaLoginComponent } from './gamma-login.component';

describe('GammaLoginComponent', () => {
  let component: GammaLoginComponent;
  let fixture: ComponentFixture<GammaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GammaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GammaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
