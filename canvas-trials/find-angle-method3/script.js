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
let drawShape = false;
let myAngleShape;
let brushColour = '#f6b73c';
let dotColour = '#f6b73c';
let muc = 0;// mouse up counter;

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

    myAngleShape = null;
}

function setRandomColor() {
    brushColour = getRandomColor();
    // console.log('brush color is ', brushColour)
    let colorElem = document.getElementById('brushInput');
    colorElem.value = brushColour;
}
function getRandomColor() {
    let r = getRandom(0, 255);
    let g = getRandom(0, 255);
    let b = getRandom(0, 255);

    let rI = getInvert(0, 255, r);
    let gI = getInvert(0, 255, g);
    let bI = getInvert(0, 255, b);

    dotColour = '#' + hexColour(rI) + hexColour(gI) + hexColour(bI);
    let colorCode = '#' + hexColour(r) + hexColour(g) + hexColour(b);
    // console.log('dotColour', dotColour)
    // console.log('brushColour', colorCode)
    return colorCode;
}

function getInvert(lower = 0, upper = 255, value = 0) {
    let colorValue = Math.floor(upper - value);
    return colorValue;
}

function getRandom(lowestPoint = 0, highestPoint = 255) {
    let colorValue = Math.floor((Math.random() * highestPoint) + lowestPoint);
    return colorValue;
}
function hexColour(c) {
    let hex = Math.abs(c).toString(16);
    hex = (hex.toString().length < 2) ? '0' + hex : hex;
    return hex;
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
    mouseDown = true;

    startDrawing(point);
}

function startDrawing(point) {
    muc = (muc >= 2) ? 0 : muc;
    let line = new Line(point, point);
    if (muc == 0) {
        myAngleShape = new AngleShape(line);
    } else {

    }
    drawShape = (muc < 3) ? true : false;
}

// handle mouse event - Mouse Move
function mouseMoveEvent(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let point = getCurrentMousePoint(e);

    // printing mouse positions
    updateMouseLabels(point.x, point.y);

    if (mouseDown && drawShape) {
        myAngleShape.sides[0].end = point;
    }
    else if (!mouseDown && drawShape && muc == 1) {
        if (myAngleShape.sides.length == 1) {
            let line = new Line(myAngleShape.sides[0].end, point);
            myAngleShape.sides.push(line);
        } else {
            myAngleShape.sides[1].end = point;
        }
    }
    if (drawShape) {
        clearAndDrawMyShape();
    }
}

function clearAndDrawMyShape() {
    clear()
    drawTheShape();
    calculateAngle();
}

function drawTheShape() {
    for (let i = 0; i < myAngleShape.sides.length; i++) {
        drawLine(myAngleShape.sides[i]);
    }
}

function drawLine(line = new Line(0, 0)) {
    model.ctx.strokeStyle = brushColour;
    const x1 = line.start.x;
    const y1 = line.start.y;
    const x2 = line.end.x;
    const y2 = line.end.y;

    model.ctx.beginPath();
    model.ctx.moveTo(x1, y1);
    model.ctx.lineTo(x2, y2);
    model.ctx.stroke();

    drawDots(x1, y1);
    drawDots(x2, y2);
}

function drawDots(x, y) {
    try {
        const r = 2;// radius;
        model.ctx.fillStyle = dotColour;
        model.ctx.beginPath();
        model.ctx.arc(x, y, r, 0, Math.PI * 2);
        model.ctx.closePath();
        model.ctx.fill();
    } catch (error) {
        console.log(error);
    }
}

function calculateAngle() {
    try {
        if (myAngleShape.sides.length == 2) {

            // The center point.
            let p0 = myAngleShape.sides[0].end;
            // The initial point.
            let p1 = myAngleShape.sides[0].start;
            // The final point.
            let p2 = myAngleShape.sides[1].end

            const p12 = Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));
            const p13 = Math.sqrt(Math.pow(p0.x - p2.x, 2) + Math.pow(p0.y - p2.y, 2));
            const p23 = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

            const angle =
                (Math.acos(
                    (Math.pow(p12, 2) + Math.pow(p13, 2) - Math.pow(p23, 2)) / (2 * p12 * p13)
                ) *
                    180) /
                Math.PI;

            console.log('angle', angle);
        }
    } catch (error) {
        console.log(error);
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

    mouseDown = false;
    drawShape = ((muc == 1) || (muc > 1)) ? false : true;
    // console.log('drawShape', drawShape, 'muc', muc)
    muc++;
}