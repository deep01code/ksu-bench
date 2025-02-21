import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam258Component } from './gam258.component';

describe('Gam258Component', () => {
  let component: Gam258Component;
  let fixture: ComponentFixture<Gam258Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam258Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam258Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
