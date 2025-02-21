import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam881Component } from './gam881.component';

describe('Gam881Component', () => {
  let component: Gam881Component;
  let fixture: ComponentFixture<Gam881Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam881Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam881Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
