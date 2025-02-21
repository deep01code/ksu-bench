import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam27Component } from './gam27.component';

describe('Gam27Component', () => {
  let component: Gam27Component;
  let fixture: ComponentFixture<Gam27Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam27Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam27Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
