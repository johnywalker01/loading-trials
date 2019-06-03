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
let shape;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Shape {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

function onBodyUnLoad() {}

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

    shape = new Shape(point, point);
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

    if (mouseDown) {
        shape.end = point
        clear();
        drawShape();
    }
}

function drawShape() {
    // // the line segment
    // model.ctx.beginPath();
    // model.ctx.moveTo(shape.start.x, shape.start.y);
    // model.ctx.lineTo(shape.end.x, shape.end.y);
    // model.ctx.closePath();

    // // the outline
    // model.ctx.strokeStyle = '#00f';
    // model.ctx.stroke();

    // drawStrokeArrow();
    drawFillArrow();
}

function drawStrokeArrow() {
    let fromx = shape.start.x;
    let fromy = shape.start.y;
    let tox = shape.end.x;
    let toy = shape.end.y;

    let headlen = 10; // length of head in pixels
    let angle = Math.atan2(toy - fromy, tox - fromx);
    let theta1 = angle - (Math.PI / 6);
    let theta2 = angle + (Math.PI / 6);

    // the line segment
    model.ctx.beginPath();
    model.ctx.moveTo(fromx, fromy);
    model.ctx.lineTo(tox, toy);

    model.ctx.lineTo(tox - headlen * Math.cos(theta1), toy - headlen * Math.sin(theta1));
    model.ctx.moveTo(tox, toy);
    model.ctx.lineTo(tox - headlen * Math.cos(theta2), toy - headlen * Math.sin(theta2));
    model.ctx.closePath();

    // the outline
    model.ctx.strokeStyle = '#00f';
    model.ctx.stroke();
}

function drawFillArrow() {
    let fromx = shape.start.x;
    let fromy = shape.start.y;
    let tox = shape.end.x;
    let toy = shape.end.y;

    // length of head in pixels
    let headlen = (calculateDistance(shape.start, shape.end) < 12) ? 6 : 9;
    let angle = Math.atan2(toy - fromy, tox - fromx);
    let theta1 = angle - (Math.PI / 6);
    let theta2 = angle + (Math.PI / 6);

    // the line segment
    model.ctx.beginPath();
    model.ctx.moveTo(fromx, fromy);
    model.ctx.lineTo(tox, toy);
    model.ctx.closePath();

    // drawing the line
    model.ctx.strokeStyle = '#00f';
    model.ctx.stroke();

    // the tip segment
    model.ctx.moveTo(tox - headlen * Math.cos(theta1), toy - headlen * Math.sin(theta1));
    model.ctx.lineTo(tox, toy);
    model.ctx.lineTo(tox - headlen * Math.cos(theta2), toy - headlen * Math.sin(theta2));
    model.ctx.closePath();

    // drawing the tip
    model.ctx.fillStyle = '#00f';
    model.ctx.fill();
}

function calculateDistance(start, end) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let x = Math.pow(dx, 2);
    let y = Math.pow(dy, 2);
    let distance = Math.sqrt(x + y).toFixed(2);

    return distance;
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
}