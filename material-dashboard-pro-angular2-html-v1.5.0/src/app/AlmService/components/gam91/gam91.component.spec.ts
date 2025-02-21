import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam91Component } from './gam91.component';

describe('Gam91Component', () => {
  let component: Gam91Component;
  let fixture: ComponentFixture<Gam91Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam91Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam91Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
