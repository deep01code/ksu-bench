import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam453Component } from './gam453.component';

describe('Gam453Component', () => {
  let component: Gam453Component;
  let fixture: ComponentFixture<Gam453Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam453Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam453Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
