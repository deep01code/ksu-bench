import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam6Component } from './gam6.component';

describe('Gam6Component', () => {
  let component: Gam6Component;
  let fixture: ComponentFixture<Gam6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
