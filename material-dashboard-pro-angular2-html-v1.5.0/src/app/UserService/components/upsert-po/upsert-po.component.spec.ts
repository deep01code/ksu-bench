import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertPoComponent } from './upsert-po.component';

describe('UpsertPoComponent', () => {
  let component: UpsertPoComponent;
  let fixture: ComponentFixture<UpsertPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
