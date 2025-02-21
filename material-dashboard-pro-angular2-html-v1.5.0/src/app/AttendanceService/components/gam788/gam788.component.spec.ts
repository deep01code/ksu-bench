import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam788Component } from './gam788.component';

describe('Gam788Component', () => {
  let component: Gam788Component;
  let fixture: ComponentFixture<Gam788Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam788Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam788Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
