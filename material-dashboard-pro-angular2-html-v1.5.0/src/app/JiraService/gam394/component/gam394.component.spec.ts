import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam394Component } from './gam394.component';

describe('Gam394Component', () => {
  let component: Gam394Component;
  let fixture: ComponentFixture<Gam394Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam394Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam394Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
