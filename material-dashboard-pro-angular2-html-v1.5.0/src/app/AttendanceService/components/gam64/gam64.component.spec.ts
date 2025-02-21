import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam64Component } from './gam64.component';

describe('Gam64Component', () => {
  let component: Gam64Component;
  let fixture: ComponentFixture<Gam64Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam64Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam64Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
