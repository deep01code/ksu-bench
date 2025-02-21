import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam267Component } from './gam267.component';

describe('Gam267Component', () => {
  let component: Gam267Component;
  let fixture: ComponentFixture<Gam267Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam267Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam267Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
