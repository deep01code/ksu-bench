import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam205Component } from './gam205.component';

describe('Gam205Component', () => {
  let component: Gam205Component;
  let fixture: ComponentFixture<Gam205Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam205Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam205Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
