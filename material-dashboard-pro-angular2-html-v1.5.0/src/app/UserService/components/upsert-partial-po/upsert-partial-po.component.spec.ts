import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertPartialPoComponent } from './upsert-partial-po.component';

describe('UpsertPartialPoComponent', () => {
  let component: UpsertPartialPoComponent;
  let fixture: ComponentFixture<UpsertPartialPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertPartialPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertPartialPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
