import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam51Component } from './gam51.component';

describe('Gam51Component', () => {
  let component: Gam51Component;
  let fixture: ComponentFixture<Gam51Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam51Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam51Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
