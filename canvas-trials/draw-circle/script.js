let model = {
    ctx: {},
    canvas: {},
    width: 500,
    height: 500,
    angleInRad: 0
};

let insideShape = false;

let offsetX;
let offsetY;
let mouseDown = false;
let shape;
let redrawShape = 0;
let drawResizeDot = false;
let resizePoint = null;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Shape {
    radius = 0;
    constructor(start, end) {
        this.start = start;
        this.end = end;
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

    shape = null;

}

function clear() {
    model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
    model.canvas.width = model.canvas.width;
}

// handle mouse event - Mouse Down
function mouseDownEvent(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let point = getCurrentMousePoint(e);

    // check cursor is on circle's circumference
    insideShape = checkCursorIsOnShape(point.x, point.y);

    if (!insideShape) {
        shape = new Shape(point, point);
    } else {
        drawResizeDot = true;
        resizePoint = point;
    }

    mouseDown = true;

}

function getCurrentMousePoint(e) {
    // get the current mouse position
    let mx = Math.floor(e.offsetX || (e.pageX - offsetX));
    let my = Math.floor(e.offsetY || (e.pageY - offsetY));

    return new Point(mx, my);
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

    // check cursor is on circle's circumference
    insideShape = checkCursorIsOnShape(point.x, point.y);

    if (mouseDown) {
        shape.end = point;
        shape.radius = calculateDistance(shape.start, shape.end);
        resizePoint = (drawResizeDot) ? point : null;
        clearAndDraw();
    }

    if (insideShape) { 
        redrawShape = 1; 
    } else {
        if (redrawShape == 1) {
            redrawShape++;
        } else if (redrawShape > 1) {
            redrawShape = 0;
        }
    }

    if (redrawShape != 0) {
        clearAndDraw();
    }
}

function clearAndDraw() {
    let r = shape.radius;
    let r1 = Number(r - 10 >= 0) ? (r - 10) : r;
    let r2 = Number(r + 10);
    // console.log(r1, r, r2)
    clear();
    drawShape(r);
    // drawShape(r1);
    // drawShape(r2);
}

function drawShape(r = 0) {
    // console.log('drawing')
    model.ctx.lineWidth = 1;
    model.ctx.strokeStyle = (insideShape) ? 'red' : 'blue';

    // the circle segment
    model.ctx.beginPath();
    model.ctx.arc(shape.start.x, shape.start.y, r, 0, 2 * Math.PI);
    model.ctx.stroke();

    if (drawResizeDot) { drawDot(); }
}


function drawDot() {
    if (resizePoint == null) return;
    let r = 3;

    model.ctx.lineWidth = 1;
    model.ctx.fillStyle = 'red';

    // the circle segment
    model.ctx.beginPath();
    model.ctx.arc(resizePoint.x, resizePoint.y, r, 0, 2 * Math.PI);
    model.ctx.fill();
}

function calculateDistance(start, end) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let x = Math.pow(dx, 2);
    let y = Math.pow(dy, 2);
    let distance = Math.sqrt(x + y).toFixed(2);
    console.log('radius',distance)

    return Number.parseInt(distance);
}

function checkCursorIsOnShape(mx, my) {
    let inside = false;
    if (shape == undefined || shape.start == undefined) { return false; }
    let cx = shape.start.x;
    let cy = shape.start.y;
    let r0 = shape.radius;
    let r1 = r0 - 5;
    let r2 = r0 + 5;
    let dx = cx - mx;
    let dy = cy - my;

    if ((dx * dx + dy * dy >= r1 * r1) && (dx * dx + dy * dy <= r2 * r2)) {
        inside = true;
    }

    return inside;
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
    drawResizeDot = false;
}