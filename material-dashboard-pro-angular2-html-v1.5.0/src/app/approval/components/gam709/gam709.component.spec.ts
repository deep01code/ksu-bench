import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam709Component } from './gam709.component';

describe('Gam709Component', () => {
  let component: Gam709Component;
  let fixture: ComponentFixture<Gam709Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam709Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam709Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

