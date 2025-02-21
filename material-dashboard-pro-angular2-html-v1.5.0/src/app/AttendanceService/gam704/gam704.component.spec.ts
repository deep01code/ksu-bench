import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam704Component } from './gam704.component';

describe('Gam704Component', () => {
  let component: Gam704Component;
  let fixture: ComponentFixture<Gam704Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam704Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam704Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
