import { Component, OnInit, AfterViewInit, ViewChild, HostListener, AfterViewChecked } from '@angular/core';
import { ShapeRendererDirective } from '../directive/shape-renderer.directive';
import { ImageRendererDirective } from '../directive/image-renderer.directive';

@Component({
  selector: 'app-shape-drawing',
  templateUrl: './shape-drawing.component.html',
  styleUrls: ['./shape-drawing.component.css']
})
export class ShapeDrawingComponent {

  @ViewChild(ShapeRendererDirective, { static: false }) shapeRendererDirective: ShapeRendererDirective;
  @ViewChild(ImageRendererDirective, { static: false }) imageRendererDirective: ImageRendererDirective;
  shapeType = 'FreeROI';
  shapeArea = 0;

  constructor() { }

  loadImageInCanvas() {
    this.imageRendererDirective.render();
  }

  onAreaCalculated(area: number) {
    this.shapeArea = area;
  }

}
