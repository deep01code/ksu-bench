import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamRoleComponent } from './gam-role.component';

describe('GamRoleComponent', () => {
  let component: GamRoleComponent;
  let fixture: ComponentFixture<GamRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
