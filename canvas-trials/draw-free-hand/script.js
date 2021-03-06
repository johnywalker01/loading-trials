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
let paintBrush;
let brushColour = '#f6b73c'

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Brush {
    path = [];
    constructor(start) {
        this.path.push(start);
    }
    addPoint(point) {
        this.path.push(point);
    }
    getPath() {
        return this.path;
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

    paintBrush = null;
}

function onColorChange() {
    let colorElem = document.getElementById('brushInput');
    brushColour = colorElem.value;
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

    paintBrush = new Brush(point);
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
        paintBrush.addPoint(point);
        clear();
        if (paintBrush.getPath().length <= 1) {
            console.log('oops')
        } else {
            drawShape();
        }
    }
}

function drawShape() {
    model.ctx.beginPath();

    let fromx = paintBrush.getPath()[0].x;
    let fromy = paintBrush.getPath()[0].y;

    model.ctx.moveTo(fromx, fromy);
    for (let i = 1; i < paintBrush.getPath().length; i++) {
        let tox = paintBrush.getPath()[i].x;
        let toy = paintBrush.getPath()[i].y;

        model.ctx.lineTo(tox, toy);

        fromx = tox;
        fromy = toy;
    }

    model.ctx.strokeStyle = brushColour;
    model.ctx.stroke();
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