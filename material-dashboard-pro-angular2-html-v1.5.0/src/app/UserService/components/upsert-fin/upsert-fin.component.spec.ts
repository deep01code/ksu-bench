import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertFinComponent } from './upsert-fin.component';

describe('UpsertFinComponent', () => {
  let component: UpsertFinComponent;
  let fixture: ComponentFixture<UpsertFinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertFinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
