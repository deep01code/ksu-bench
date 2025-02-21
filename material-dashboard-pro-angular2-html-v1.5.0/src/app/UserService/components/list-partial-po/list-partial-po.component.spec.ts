import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartialPoComponent } from './list-partial-po.component';

describe('ListPartialPoComponent', () => {
  let component: ListPartialPoComponent;
  let fixture: ComponentFixture<ListPartialPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPartialPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPartialPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
