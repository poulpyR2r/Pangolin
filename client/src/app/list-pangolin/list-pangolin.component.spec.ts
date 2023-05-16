import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPangolinComponent } from './list-pangolin.component';

describe('ListPangolinComponent', () => {
  let component: ListPangolinComponent;
  let fixture: ComponentFixture<ListPangolinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPangolinComponent]
    });
    fixture = TestBed.createComponent(ListPangolinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
