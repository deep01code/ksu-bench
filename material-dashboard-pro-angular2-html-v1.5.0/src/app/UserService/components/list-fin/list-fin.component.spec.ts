import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinComponent } from './list-fin.component';

describe('ListFinComponent', () => {
  let component: ListFinComponent;
  let fixture: ComponentFixture<ListFinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
