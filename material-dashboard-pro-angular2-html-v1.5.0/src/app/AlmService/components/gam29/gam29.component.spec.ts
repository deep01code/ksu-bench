import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam29Component } from './gam29.component';

describe('Gam29Component', () => {
  let component: Gam29Component;
  let fixture: ComponentFixture<Gam29Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam29Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam29Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
