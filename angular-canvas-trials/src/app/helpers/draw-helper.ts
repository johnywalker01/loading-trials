import { CanvasModel, Point } from '../model/canvas-model';
import { ShapeBase } from '../model/shape-base';

export class DrawHelper {
    static toFixed(value: number, precision: number) {
        const power = Math.pow(10, precision || 0);
        return Number(Math.round(value * power) / power);
    }
    static findPixelDistance(point1: Point, point2: Point): number {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        const x = Math.pow(dx, 2);
        const y = Math.pow(dy, 2);
        if (isNaN(x) || isNaN(y)) { return 0; }
        const distance = this.toFixed(Math.sqrt(x + y), 2);

        return Number.parseInt(distance.toString(), 10);
    }
    static getAreaFromNumberOfPixels(pixelCount: number) {
        return (1 / (26 * 26) * pixelCount);
    }
    static updateRadius(shape: ShapeBase) {
        shape.radius = this.findPixelDistance(shape.start, shape.end);
    }
    static updateWidthAndHeight(shape: ShapeBase) {
        if (shape.start != null && shape.end != null) {
            shape.width = shape.end.x - shape.start.x;
            shape.height = shape.end.y - shape.start.y;
        }
    }

    static drawRectangleShape(ctx: CanvasRenderingContext2D, shape: ShapeBase, completeShape: boolean = false, clipShape: boolean = false) {
        this.updateWidthAndHeight(shape);
        ctx.beginPath();
        ctx.rect(shape.start.x, shape.start.y, shape.width, shape.height);

        if (completeShape && clipShape) {
            ctx.clip();
            ctx.closePath();
        } else if (completeShape && !clipShape) {
            ctx.closePath();
        }

        ctx.strokeStyle = '#F588FF';
        ctx.stroke();
    }

    static drawCircleShape(ctx: CanvasRenderingContext2D,
                           shapeBase: ShapeBase, completeShape: boolean = false, clipShape: boolean = false) {
        this.updateRadius(shapeBase);
        ctx.beginPath();
        ctx.arc(shapeBase.start.x, shapeBase.start.y, shapeBase.radius, 0, 2 * Math.PI);

        if (completeShape && clipShape) {
            ctx.clip();
            ctx.closePath();
        } else if (completeShape && !clipShape) {
            ctx.closePath();
        }

        ctx.strokeStyle = '#F588FF';
        ctx.stroke();
    }
    static drawROIShape(ctx: CanvasRenderingContext2D,
                        shapeBase: ShapeBase, completeShape: boolean = false, clipShape: boolean = false) {
        const fromx = shapeBase.start.x;
        const fromy = shapeBase.start.y;

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        shapeBase.vertices.forEach((vertex: Point) => {
            const tox = vertex.x;
            const toy = vertex.y;

            ctx.lineTo(tox, toy);
        });

        if (completeShape && clipShape) {
            ctx.clip();
            ctx.closePath();

        } else if (completeShape && !clipShape) {
            ctx.closePath();
        }
        ctx.strokeStyle = '#F588FF';
        ctx.stroke();
    }
    static drawImage(ctx: CanvasRenderingContext2D, canvasImage: HTMLImageElement) {
        const width = canvasImage.width;
        const height = canvasImage.height;
        ctx.drawImage(canvasImage, 0, 0, width, height);
    }

    static clearCanvas(canvasModel: CanvasModel) {
        canvasModel.ctx.clearRect(0, 0, canvasModel.canvas.width, canvasModel.canvas.height);
        canvasModel.canvas.width = canvasModel.canvas.width;
    }

    static calculatePixelCount(canvasModel: CanvasModel, canvasImage: HTMLImageElement) {
        // Now we can get the image data from the canvas.
        const imageData = canvasModel.ctx.getImageData(0, 0, canvasImage.width, canvasImage.height);
        const pixelData = imageData.data;

        let reds = 0;
        let greens = 0;
        let blues = 0;

        let r = 0; // reds
        let g = 0; // green
        let b = 0; // blue
        // let a = 0; // alpha
        let nonBlackPixelCount = 0;
        let blackPixelCount = 0;
        for (let i = 0; i < pixelData.length; i += 4) {
            r = pixelData[i];
            g = pixelData[i + 1];
            b = pixelData[i + 2];
            // a = pixelData[i + 3];

            if (r > 0) { reds++; }
            if (g > 0) { greens++; }
            if (b > 0) { blues++; }

            // not a black shade
            if (r > 0 || g > 0 || b > 0) {
                nonBlackPixelCount += 1;
            } else {
                blackPixelCount += 1;
            }
        }
        // console.log({ reds }, { greens }, { blues }, { nonBlackPixelCount }, { blackPixelCount });

        const area = this.toFixed(this.getAreaFromNumberOfPixels(nonBlackPixelCount),2);
        // console.log('area is ', area);
        return area;
    }
}
