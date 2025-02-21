import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamUserComponent } from './gam-user.component';

describe('GamUserComponent', () => {
  let component: GamUserComponent;
  let fixture: ComponentFixture<GamUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
