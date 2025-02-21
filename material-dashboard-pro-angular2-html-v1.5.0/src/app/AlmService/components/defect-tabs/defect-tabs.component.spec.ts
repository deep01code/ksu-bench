import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectTabsComponent } from './defect-tabs.component';

describe('DefectTabsComponent', () => {
  let component: DefectTabsComponent;
  let fixture: ComponentFixture<DefectTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
