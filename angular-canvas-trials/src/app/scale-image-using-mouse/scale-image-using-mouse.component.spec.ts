import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleImageUsingMouseComponent } from './scale-image-using-mouse.component';

describe('ScaleImageUsingMouseComponent', () => {
  let component: ScaleImageUsingMouseComponent;
  let fixture: ComponentFixture<ScaleImageUsingMouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleImageUsingMouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleImageUsingMouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
