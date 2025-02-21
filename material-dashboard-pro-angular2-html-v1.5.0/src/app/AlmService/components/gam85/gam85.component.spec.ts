import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam85Component } from './gam85.component';

describe('Gam85Component', () => {
  let component: Gam85Component;
  let fixture: ComponentFixture<Gam85Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam85Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam85Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
