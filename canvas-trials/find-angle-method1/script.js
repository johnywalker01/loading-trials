let model = {
    ctx: {},
    canvas: {},
    width: 500,
    height: 500,
    angleInRad: 0
};
let radius = 2;
let width;
let height;

let offsetX;
let offsetY;
let mouseDown = false;
let shapeDrawing = false;
let adjacentSide;
let brushColour = '#f6b73c'

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    start;
    end;
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
class AngleShape {
    sides = [];
    constructor(line) {
        this.sides.push(line);
    }
}

function onBodyUnLoad() { }

/**
 * set initial properties on html body load
 */
function onBodyLoad() {
    // setup canvas
    model.canvas = document.getElementById('myCanvas');
    model.ctx = model.canvas.getContext('2d');
    offsetX = model.canvas.offsetLeft;
    offsetY = model.canvas.offsetTop;
    console.log('offsetX', offsetX, 'offsetY', offsetY)

    model.canvas.width = model.width;
    model.canvas.height = model.height;

    // listen for mouse events
    model.canvas.onmousedown = mouseDownEvent;
    model.canvas.onmousemove = mouseMoveEvent;
    model.canvas.onmouseup = mouseUpEvent;

    adjacentSide = null;
}

function onColorChange() {
    let colorElem = document.getElementById('brushInput');
    brushColour = colorElem.value;
}

function clear() {
    model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
    model.canvas.width = model.canvas.width;
}

function getCurrentMousePoint(e) {
    // get the current mouse position
    let mx = Math.floor(e.offsetX || (e.pageX - offsetX));
    let my = Math.floor(e.offsetY || (e.pageY - offsetY));

    return new Point(mx, my);
}

// handle mouse event - Mouse Down
function mouseDownEvent(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let point = getCurrentMousePoint(e);

    updateAdjacentSide(point);

    mouseDown = true;
    shapeDrawing = (adjacentSide != null && adjacentSide.sides.length <= 2) ? true : false;
}

function updateAdjacentSide(point) {
    let line = new Line(point, point);
    if (adjacentSide == null) {
        adjacentSide = new AngleShape(line);
        console.log('adjacentSide == null')
    } else {
        switch (adjacentSide.sides.length) {
            case 1:
                line.start = adjacentSide.sides[0].end;
                adjacentSide.sides.push(line);
                console.log('case 1')
                break;

            default:
                adjacentSide = new AngleShape(line);
                console.log('default')
                break;
        }
    }
    console.log('adjacentSide', adjacentSide)
}

// handle mouse event - Mouse Move
function mouseMoveEvent(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let point = getCurrentMousePoint(e);

    // draw a tiny dot to identify mouse point in the context; on mouse down
    updateMouseLabels(point.x, point.y);

    if (mouseDown && shapeDrawing) {
        switch (adjacentSide.sides.length) {
            case 1:
                adjacentSide.sides[0].end = point;
                break;
            case 2:
                adjacentSide.sides[1].end = point;
                break;

            default:
                break;
        }
        clear()
        drawShape();
    }
}

function drawShape() {
    model.ctx.beginPath();

    for (let i = 0; i < adjacentSide.sides.length; i++) {
        drawLine(adjacentSide.sides[i]);
    }

    model.ctx.strokeStyle = brushColour;
    model.ctx.stroke();
}

function drawLine(line = new Line(0, 0)) {
    const x1 = line.start.x;
    const y1 = line.start.y;
    const x2 = line.end.x;
    const y2 = line.end.y;
    model.ctx.moveTo(x1, y1);
    model.ctx.lineTo(x2, y2);
}

function updateMouseLabels(mx, my) {
    let xLbl = document.getElementById('mouseXLbl');
    xLbl.innerText = mx;
    let yLbl = document.getElementById('mouseYLbl');
    yLbl.innerText = my;
}


// handle mouse event - Mouse Up
function mouseUpEvent(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    mouseDown = false;
    shapeDrawing = false;
}