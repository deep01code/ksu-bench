import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam304Component } from './gam304.component';

describe('Gam304Component', () => {
  let component: Gam304Component;
  let fixture: ComponentFixture<Gam304Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam304Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam304Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
