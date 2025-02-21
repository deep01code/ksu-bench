import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam4Component } from './gam4.component';

describe('Gam4Component', () => {
  let component: Gam4Component;
  let fixture: ComponentFixture<Gam4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
