import { Directive, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';
import { CanvasModel, Point } from 'src/app/model/canvas-model';
import { fabric } from 'fabric';

@Directive({
  selector: '[appFabricRenderer]'
})
export class FabricRendererDirective implements AfterViewInit {
  canvasModel: CanvasModel;
  private canvasImage = new Image();

  constructor(private el: ElementRef) {
    const canvas: HTMLCanvasElement = this.el.nativeElement;
    this.canvasModel = new CanvasModel(canvas, canvas.getContext('2d'));
    this.canvasModel.canvas.width = 900;
    this.canvasModel.canvas.height = 600;
    this.canvasImage.src = 'assets/images/beach_640.jpg';
  }

  ngAfterViewInit() {
    this.render();
  }


  render() {
    const canvas = new fabric.Canvas(this.el.nativeElement);

    // create a rectangle with angle=45
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
      angle: 45
    });
    canvas.add(rect);

    // create a rectangle with angle=45
    const text = new fabric.Text('hello world', { left: 100, top: 100 });
    canvas.add(text);
  }

}
