import { CanvasModel, Point } from '../model/canvas-model';
import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appPanZoom]'
})
export class PZDirective implements AfterViewInit {
  public canvasModel: CanvasModel;
  private mouseDown = false;
  private canvasRect: any;
  private mDownPoint: Point;
  private canvasImage = new Image();

  private scalingFactor = 1.01;
  private lastStopInY = 0;
  private ls = 0;

  constructor(private el: ElementRef) {
    const canvas: HTMLCanvasElement = this.el.nativeElement;
    this.canvasModel = new CanvasModel(canvas, canvas.getContext('2d'));
    this.canvasModel.canvas.width = 1000;
    this.canvasModel.canvas.height = 800;

    this.canvasImage.src = 'assets/images/human_Chest_PA.jpg';
    // this.canvasImage.crossOrigin = 'anonymous';
  }

  ngAfterViewInit() {
    this.canvasRect = this.canvasModel.canvas.getBoundingClientRect();
    this.redrawImage();
  }

  private clearCanvas() {
    this.canvasModel.ctx.clearRect(0, 0, this.canvasModel.canvas.width, this.canvasModel.canvas.height);
    this.canvasModel.canvas.width = this.canvasModel.canvas.width;
  }

  private getVariance(mousePoint: Point, mouseDownPoint: Point) {
    const updatedY = mouseDownPoint.y - mousePoint.y;
    console.log('updatedY ', updatedY);
    return this.lastStopInY + updatedY;
  }

  private updateScaleValue(exponent) {
    const zoom = Math.pow(this.scalingFactor, exponent);
    console.log('zoom', zoom);

    this.canvasModel.scale = zoom;
  }

  private redrawImage() {
    this.clearCanvas();

    const width = this.canvasImage.width;
    const height = this.canvasImage.height;

    const dx = this.mDownPoint ? this.mDownPoint.x : 0;
    const dy = this.mDownPoint ? this.mDownPoint.y : 0;

    // this.canvasModel.ctx.setTransform(this.canvasModel.scale, 0, 0, this.canvasModel.scale, dx, dy);
    // this.canvasModel.ctx.drawImage(this.canvasImage, -0.5 * width, -0.5 * height, width, height);
    // this.canvasModel.ctx.setTransform(this.canvasModel.scale, 0, 0, this.canvasModel.scale, -dx, -dy);

    const scale = this.canvasModel.scale;

    this.canvasModel.ctx.translate(dx, dy);
    this.canvasModel.ctx.scale(scale, scale);
    this.canvasModel.ctx.drawImage(this.canvasImage, -dx, -dy, width, height); // destination rectangle;
    // this.canvasModel.ctx.translate(-dx, -dy);

    this.drawPointer(this.canvasModel.ctx);

  }

  drawPointer(ctx: any) {
    // draw reference circle in the middle
    ctx.fillStyle = 'rgba(200,0,0,1)';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.lineTo(0, -6);
    ctx.moveTo(-6, 0);
    ctx.lineTo(6, 0);
    ctx.stroke();
  }


  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    // console.log({ event });
    this.mouseDown = true;
    this.mDownPoint = new Point((event.clientX - this.canvasRect.left), (event.clientY - this.canvasRect.top));
    // this.lastPoint = this.mDownPoint;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if (this.mouseDown) {
      const mPoint = new Point((event.clientX - this.canvasRect.left), (event.clientY - this.canvasRect.top));
      this.ls = this.getVariance(mPoint, this.mDownPoint);
      this.updateScaleValue(this.ls);
      this.redrawImage();

    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event) {
    // console.log({ event });
    this.mouseDown = false;
    this.mDownPoint = null;
    this.lastStopInY = this.ls;
  }

}
