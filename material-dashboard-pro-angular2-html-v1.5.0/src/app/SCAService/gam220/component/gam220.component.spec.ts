import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam220Component } from './gam220.component';

describe('Gam220Component', () => {
  let component: Gam220Component;
  let fixture: ComponentFixture<Gam220Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam220Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam220Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
