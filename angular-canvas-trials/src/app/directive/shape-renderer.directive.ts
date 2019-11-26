import { Directive, ElementRef, AfterViewInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CanvasModel, Point } from 'src/app/model/canvas-model';
import { ShapeBase } from '../model/shape-base';
import { DrawHelper } from '../helpers/draw-helper';

@Directive({
  selector: '[appShapeRenderer]'
})
export class ShapeRendererDirective implements AfterViewInit {
  canvasModel: CanvasModel;
  private mouseDown = false;
  private canvasRect: any;
  private mDownPoint: Point;
  private canvasImage = new Image();


  private myShape: ShapeBase;
  @Input('shapeType') shapeType: string;
  @Output() areaCalculated = new EventEmitter<number>();

  constructor(private el: ElementRef) {
    const canvas: HTMLCanvasElement = this.el.nativeElement;
    this.canvasModel = new CanvasModel(canvas, canvas.getContext('2d'));
    this.canvasModel.canvas.width = 900;
    this.canvasModel.canvas.height = 600;
    this.canvasImage.src = 'assets/images/beach_640.jpg';
  }

  ngAfterViewInit() {
    this.canvasRect = this.canvasModel.canvas.getBoundingClientRect();
    // this.render();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.mouseDown = true;
    this.mDownPoint = this.getMousePos(this.canvasModel.canvas, event);
    this.myShape = new ShapeBase(this.mDownPoint, this.shapeType);

    this.canvasModel.area = 0;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if (this.mouseDown) {
      const mousePos = this.getMousePos(this.canvasModel.canvas, event);
      this.myShape.addPoints(mousePos);
      DrawHelper.clearCanvas(this.canvasModel);
      this.drawShape();
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event) {
    if (this.myShape.vertices.length > 1 || this.myShape.end !== undefined) {
      DrawHelper.clearCanvas(this.canvasModel);
      this.drawShape(true, true);
      DrawHelper.drawImage(this.canvasModel.ctx, this.canvasImage);
      const area = DrawHelper.calculatePixelCount(this.canvasModel, this.canvasImage);
      this.areaCalculated.emit(area);
      // DrawHelper.clearCanvas(this.canvasModel);
      // this.drawShape(true);
    }
    this.mouseDown = false;
    this.mDownPoint = null;
  }

  drawShape(completeShape: boolean = false, clipShape: boolean = false) {

    switch (this.shapeType.toUpperCase()) {
      case 'FREEROI':
        DrawHelper.drawROIShape(this.canvasModel.ctx, this.myShape, completeShape, clipShape);
        break;
      case 'CIRCLE':
        DrawHelper.drawCircleShape(this.canvasModel.ctx, this.myShape, completeShape, clipShape);
        break;
      case 'RECTANGLE':
        DrawHelper.drawRectangleShape(this.canvasModel.ctx, this.myShape, completeShape, clipShape);
        break;

      default:
        break;
    }
  }

  render() {
    DrawHelper.clearCanvas(this.canvasModel);
  }

  getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
  }

}
