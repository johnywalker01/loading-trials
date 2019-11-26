import { Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CanvasModel, Point } from 'src/app/model/canvas-model';
import { DrawHelper } from '../helpers/draw-helper';

@Directive({
  selector: '[appImageRenderer]'
})
export class ImageRendererDirective implements AfterViewInit {
  canvasModel: CanvasModel;
  private mouseDown = false;
  private canvasRect: any;
  private mDownPoint: Point;
  private canvasImage = new Image();

  constructor(private el: ElementRef) {
    const canvas: HTMLCanvasElement = this.el.nativeElement;
    this.canvasModel = new CanvasModel(canvas, canvas.getContext('2d'));
    this.canvasModel.canvas.width = 900;
    this.canvasModel.canvas.height = 600;

    // this.canvasImage.src = 'assets/images/beach_640.jpg';
    this.canvasImage.src = 'assets/images/foliage-leaf-4579709_1280.jpg';
  }

  ngAfterViewInit() {
    this.canvasRect = this.canvasModel.canvas.getBoundingClientRect();
  }

  render() {
    DrawHelper.clearCanvas(this.canvasModel);
    DrawHelper.drawImage(this.canvasModel.ctx, this.canvasImage);
  }

}
