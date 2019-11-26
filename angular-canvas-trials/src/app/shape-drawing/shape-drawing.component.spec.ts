import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeDrawingComponent } from './shape-drawing.component';

describe('ShapeDrawingComponent', () => {
  let component: ShapeDrawingComponent;
  let fixture: ComponentFixture<ShapeDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
