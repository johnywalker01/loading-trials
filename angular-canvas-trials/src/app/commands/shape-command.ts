import { CanvasModel, Point } from '../model/canvas-model';
import { ShapeBase } from '../model/shape-base';
import { DrawHelper } from '../helpers/draw-helper';

export class ShapeCommand {
    mouseDown = false;
    canvasRect: any;
    mDownPoint: Point;
    shapeType: string;
    myShape: ShapeBase;

    constructor(shapeType: string) {
        this.shapeType = shapeType;
    }

    onMouseDown(event: any, canvasModel: CanvasModel) {
        this.mouseDown = true;
        this.mDownPoint = new Point((event.clientX - this.canvasRect.left), (event.clientY - this.canvasRect.top));
        this.myShape = new ShapeBase(this.mDownPoint, this.shapeType);
    }
    onMouseMove(event: any, canvasModel: CanvasModel) {
        if (this.mouseDown) {
            const mPoint = new Point((event.clientX - this.canvasRect.left), (event.clientY - this.canvasRect.top));
            this.myShape.addPoints(mPoint);

            DrawHelper.clearCanvas(canvasModel);
            // DrawHelper.drawImage(this.canvasModel, this.canvasImage);
            this.drawShape(canvasModel);
        }
    }

    onMouseUp(event: any, canvasModel: CanvasModel) {
        if (this.myShape.vertices.length > 1 || this.myShape.end !== undefined) {
            DrawHelper.clearCanvas(canvasModel);
            this.drawShape(canvasModel, true);
            // DrawHelper.drawImage(this.canvasModel, this.canvasImage);
            // DrawHelper.calculatePixelCount(canvasModel, canvasImage);
        }
        this.mouseDown = false;
        this.mDownPoint = null;
    }

    drawShape(canvasModel: CanvasModel, clipShape: boolean = false) {
        switch (this.shapeType.toUpperCase()) {
            case 'FREEROI':
                DrawHelper.drawROIShape(canvasModel.ctx, this.myShape, clipShape);
                break;
            case 'CIRCLE':
                DrawHelper.drawCircleShape(canvasModel.ctx, this.myShape, clipShape);
                break;

            default:
                break;
        }
    }
}
