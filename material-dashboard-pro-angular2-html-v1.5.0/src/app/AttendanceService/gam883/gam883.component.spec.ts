import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam883Component } from './gam883.component';

describe('Gam883Component', () => {
  let component: Gam883Component;
  let fixture: ComponentFixture<Gam883Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam883Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam883Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
