import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam92Component } from './gam92.component';

describe('Gam92Component', () => {
  let component: Gam92Component;
  let fixture: ComponentFixture<Gam92Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam92Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam92Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
