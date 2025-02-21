import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam259Component } from './gam259.component';

describe('Gam259Component', () => {
  let component: Gam259Component;
  let fixture: ComponentFixture<Gam259Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam259Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam259Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
