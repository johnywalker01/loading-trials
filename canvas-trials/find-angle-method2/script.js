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
let angleShape;
let brushColour;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class AngleShape {
    p1; p2; p3;
    constructor(p1) {
        this.p1 = p1;
    }
}

function setRandomColor() {
    brushColour = getRandomColor();
    console.log('brush color is ', brushColour)
    let colorElem = document.getElementById('brushInput');
    colorElem.value = brushColour;
}
function getRandomColor() {
    let r = getRandom(0, 255).toString(16);
    let g = getRandom(0, 255).toString(16);
    let b = getRandom(0, 255).toString(16);
    let colorCode = '#' + r + g + b;
    return colorCode;
}

function getRandom(lowestPoint = 0, highestPoint = 255) {
    // lowestPoint = 0;
    // highestPoint = 255;
    let colorValue = Math.floor((Math.random() * highestPoint) + lowestPoint);
    return colorValue;
}

function onBodyUnLoad() { }

/**
 * set initial properties on html body load
 */
function onBodyLoad() {
    setRandomColor();
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

    angleShape = null;
}

function onColorChange() {
    let colorElem = document.getElementById('brushInput');
    brushColour = colorElem.value;
    console.log(colorElem.value);
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

    shapeDrawing = (checkShapePoints()) ? true : false;
}

function checkShapePoints() {
    return (angleShape != null && (angleShape.p1 == null || angleShape.p2 == null || angleShape.p3 == null)) ? true : false;
}

function updateAdjacentSide(point) {
    if (angleShape == null) {
        angleShape = new AngleShape(point);
    } else {
        // resetting angleShape, if a shape has drawn already.
        if ((angleShape.p1 != null && angleShape.p2 != null && angleShape.p3 != null)) {
            angleShape = new AngleShape(point);
            return;
        }
        if (angleShape != null) {
            // for identifying the 2nd and 3rd mouse clicks.
            if (angleShape.p2 == null) {
                angleShape.p2 = point;
            }
            else if (angleShape.p3 == null) {
                angleShape.p3 = point;
            }
        }
    }
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

    if (shapeDrawing) {
        clear()
        drawShape(point);
    }
}

function drawShape(point) {
    model.ctx.beginPath();

    drawLine(point);

    model.ctx.strokeStyle = brushColour;
    model.ctx.stroke();
}

function drawLine(point) {
    let x1, x2, x3;
    let y1, y2, y3;
    x1 = angleShape.p1.x;
    y1 = angleShape.p1.y;
    if (angleShape.p2 == null) {
        x2 = point.x;
        y2 = point.y;
    } else {
        x2 = angleShape.p2.x;
        y2 = angleShape.p2.y;
    }
    if (angleShape.p3 == null) {
        x3 = point.x;
        y3 = point.y;
    } else {
        x3 = angleShape.p3.x;
        y3 = angleShape.p3.y;
    }
    model.ctx.moveTo(x1, y1);
    model.ctx.lineTo(x2, y2);
    if (x3 != null && y3 != null) {
        model.ctx.lineTo(x3, y3);
    }
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

    if (!checkShapePoints()) {
        shapeDrawing = false;
    }
}