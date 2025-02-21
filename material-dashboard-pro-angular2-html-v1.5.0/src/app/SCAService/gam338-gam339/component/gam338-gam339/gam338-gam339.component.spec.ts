import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam338Gam339Component } from './gam338-gam339.component';

describe('Gam338Gam339Component', () => {
  let component: Gam338Gam339Component;
  let fixture: ComponentFixture<Gam338Gam339Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam338Gam339Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam338Gam339Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
