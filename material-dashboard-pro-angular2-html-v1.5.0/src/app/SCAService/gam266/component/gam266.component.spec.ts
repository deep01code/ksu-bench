import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam266Component } from './gam266.component';

describe('Gam266Component', () => {
  let component: Gam266Component;
  let fixture: ComponentFixture<Gam266Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam266Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam266Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
