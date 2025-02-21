import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam52Component } from './gam52.component';

describe('Gam52Component', () => {
  let component: Gam52Component;
  let fixture: ComponentFixture<Gam52Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam52Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam52Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
