import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam7Component } from './gam7.component';

describe('Gam7Component', () => {
  let component: Gam7Component;
  let fixture: ComponentFixture<Gam7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
