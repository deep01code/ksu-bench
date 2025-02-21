import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam133Component } from './gam133.component';

describe('Gam133Component', () => {
  let component: Gam133Component;
  let fixture: ComponentFixture<Gam133Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam133Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam133Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
