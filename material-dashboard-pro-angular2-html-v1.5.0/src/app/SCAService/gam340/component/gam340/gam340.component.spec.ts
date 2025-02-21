import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam340Component } from './gam340.component';

describe('Gam340Component', () => {
  let component: Gam340Component;
  let fixture: ComponentFixture<Gam340Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam340Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam340Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
