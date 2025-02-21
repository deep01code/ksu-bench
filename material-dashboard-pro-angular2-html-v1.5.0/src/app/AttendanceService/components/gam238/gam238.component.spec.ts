import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam238Component } from './gam238.component';

describe('Gam238Component', () => {
  let component: Gam238Component;
  let fixture: ComponentFixture<Gam238Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam238Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam238Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
