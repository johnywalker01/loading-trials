import { Point } from './canvas-model';

export class ShapeBase {

    start: Point;
    end: Point;
    shapeType = ''; // FreeROI, Circle, Rectangle
    radius = 0;
    width = 0;
    height = 0;

    vertices: Point[] = [];

    constructor(start: Point, shapeType: string) {
        this.start = start;
        this.shapeType = shapeType;
    }

    addPoints(p: Point) {
        if (this.shapeType.toUpperCase() === 'FREEROI') {
            this.vertices.push(p);
        } else {
            this.end = p;
        }
    }

}
