import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam86Component } from './gam86.component';

describe('Gam86Component', () => {
  let component: Gam86Component;
  let fixture: ComponentFixture<Gam86Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam86Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam86Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
