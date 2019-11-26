export class CanvasModel {
  /**
   * The canvas object in which image is rendered
   */
  canvas: HTMLCanvasElement;
  /**
   * The canvas 2D context where image needs to be drawn
   */
  ctx: CanvasRenderingContext2D;

  scale = 1;

  radius = 0;
  area = 0;

  /**
   * For initiallizing canvas and context.
   * @param HTMLCanvasElement canvas - canvas where image rendering is done
   * @param CanvasRenderingContext2D ctx - canvas context
   */
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }
}

export class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
