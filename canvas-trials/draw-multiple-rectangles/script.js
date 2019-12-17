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
let mouseDownPoint;
let lastMousePoint;
let myShape;
let myShapes = [];
let brushColour = '#f6b73c';
let dotColour = '#f6b73c';
let dragMyShape = false;
let genSrchRad = 5;
let genRad = 2;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Shape {
    drag = false;
    doHl = false;
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

    myShape = null;
}

function makeRandomColor() {
    setRandomColor();
}

function setRandomColor() {
    brushColour = getRandomColor();
    dotColour = getInvertColor(brushColour);
    // console.log('brush color is ', brushColour)
    let colorElem = document.getElementById('brushInput');
    colorElem.value = brushColour;
    let colourElem = document.getElementById('antiBrushInput');
    colourElem.value = dotColour;
}
function getRandomColor() {
    let r = getRandom(0, 255);
    let g = getRandom(0, 255);
    let b = getRandom(0, 255);
    let colorCode = '#' + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);
    console.log('colorCode ', colorCode)
    return colorCode;
}
function getInvertColor(color) {
    let r = color.substr(1, 2);
    let g = color.substr(3, 2);
    let b = color.substr(5, 2);

    let rI = getInvert(0, 255, hexToDecimal(r));
    let gI = getInvert(0, 255, hexToDecimal(g));
    let bI = getInvert(0, 255, hexToDecimal(b));
    // console.log('rgb ', r, g, b)

    let colorCode = '#' + decimalToHex(rI) + decimalToHex(gI) + decimalToHex(bI);
    // console.log('colorCode ', colorCode)
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
function decimalToHex(c) {
    let hex = Math.abs(c).toString(16);
    hex = (hex.toString().length < 2) ? '0' + hex : hex;
    return hex;
}
function hexToDecimal(hexString) {
    return parseInt(hexString, 16);
}

function onColorChange() {
    let colorElem = document.getElementById('brushInput');
    brushColour = colorElem.value;
}

function onColourChange() {
    let colorElem = document.getElementById('antiBrushInput');
    dotColour = colorElem.value;
}

function clear() {
    model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
    // model.canvas.width = model.canvas.width;
}

// handle mouse event - Mouse Down
function mouseDownEvent(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let point = getCurrentMousePoint(e);

    checkMouseOnShapeRef(point);
    mouseDown = true;
    mouseDownPoint = point;
    lastMousePoint = point;
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
        let dx = point.x - lastMousePoint.x;
        let dy = point.y - lastMousePoint.y;

        if (dragMyShape) {
            // console.log('dragging')
            const newShapes = myShapes.filter((shape) => (shape.drag));
            newShapes.forEach(shape => {
                shape.start.x += dx;
                shape.start.y += dy;
                shape.end.x += dx;
                shape.end.y += dy;
            });

        } else {
            const newShapes = myShapes.filter((shape) => shape.start == mouseDownPoint)
            if (newShapes.length == 0) {
                myShapes.push(new Shape(mouseDownPoint, point));
                // console.log('added')
            } else {
                newShapes.forEach(shape => {
                    shape.end = point;
                    // console.log('modified')
                });
            }
        }
        clear();
        drawShape();
        lastMousePoint = point;
    }
}

function drawShape() {
    model.ctx.lineWidth = 2;
    myShapes.forEach((shape) => {
        model.ctx.strokeStyle = (shape.doHl) ? dotColour : brushColour;
        let w = shape.end.x - shape.start.x;
        let h = shape.end.y - shape.start.y;
        model.ctx.strokeRect(shape.start.x, shape.start.y, w, h);
        // model.ctx.rect(shape.start.x, shape.start.y, w, h);
        // model.ctx.stroke();

        // let x = shape.start.x;
        // let y = shape.start.y;
        // model.ctx.beginPath();
        // model.ctx.arc(x, y, r, 0, Math.PI * 2);
        // model.ctx.fillStyle = dotColour;
        // model.ctx.fill();
        drawDots(shape.start.x, shape.start.y, genRad)
    });
    // drawDots();
}

function drawDots(x, y, r) {
    model.ctx.beginPath();
    model.ctx.arc(x, y, r, 0, Math.PI * 2);
    model.ctx.fillStyle = dotColour;
    model.ctx.fill();
    // let r = 2;
    // myShapes.forEach((shape) => {
    //     let x = shape.start.x;
    //     let y = shape.start.y;
    // });
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

    if (mouseDown) {
        mouseDown = false;
        myShapes.forEach(shape => {
            shape.drag = false;
        });
        dragMyShape = false;
        // console.log(myShapes)
    }

}
function checkPoint(checkPoint, mousePoint, radius) {
    let inside = false;
    let cx = checkPoint.x;
    let cy = checkPoint.y;
    let mx = mousePoint.x;
    let my = mousePoint.y;
    let dx = cx - mx;
    let dy = cy - my;

    inside = (dx * dx + dy * dy <= radius * radius) ? true : false;
    // console.log("inside",inside)
    return inside;
}
function checkMouseOnShapeRef(point) {
    myShapes.forEach((shape) => {
        if (checkPoint(shape.start, point, genSrchRad)) {
            shape.drag = true;
            dragMyShape = true;
        }
    });

}
function checkMouseOnShapeRefWhileMove(shapePoint, mousePoint) {
    // console.log(shapePoint)
    if (shapePoint)
        return checkPoint(shapePoint, mousePoint, genSrchRad)
    else return false;
}
