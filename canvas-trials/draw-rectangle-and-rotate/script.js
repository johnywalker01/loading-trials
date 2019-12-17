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
let selectedOps = '';
let prevAngle;
let centerX;
let centerY;
let mouseDownAngle;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Shape {
    drag = false;
    doHl = false;
    rotStart;
    rotEnd;
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.rotStart = this.start;
        this.rotEnd = this.end;
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
    onOpsChange();
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
function onOpsChange() {
    let opsElem = document.getElementById('myOperation');
    selectedOps = opsElem.value;
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

    if (selectedOps == 'drawShape') {
        checkMouseOnShapeRef(point);

    } else if (selectedOps == 'rotateCanvas') {
        beginRotate(e);
    }

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
        if (selectedOps == 'drawShape') {

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

                    shape.rotStart = shape.start;
                    shape.rotEnd = shape.end;
                });

            } else {
                const newShapes = myShapes.filter((shape) => shape.start == mouseDownPoint)
                if (newShapes.length == 0) {
                    myShapes.push(new Shape(mouseDownPoint, point));
                    // console.log('added')
                } else {
                    newShapes.forEach(shape => {
                        shape.end = point;
                        shape.rotEnd = shape.end;
                        // console.log('modified')
                    });
                }
            }
            clear();
            drawShape();
            lastMousePoint = point;

        } else if (selectedOps == 'rotateCanvas') {
            onRotate(e);
        }
    }
}

function drawShape() {
    model.ctx.lineWidth = 2;
    myShapes.forEach((shape) => {
        model.ctx.strokeStyle = (shape.doHl) ? dotColour : brushColour;
        let w = shape.end.x - shape.start.x;
        let h = shape.end.y - shape.start.y;
        model.ctx.strokeRect(shape.start.x, shape.start.y, w, h);
        drawDots(shape.start.x, shape.start.y, genRad)
    });
    // drawDots();
}

function drawDots(x, y, r) {
    model.ctx.beginPath();
    model.ctx.arc(x, y, r, 0, Math.PI * 2);
    model.ctx.fillStyle = dotColour;
    model.ctx.fill();
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
        if (selectedOps == 'drawShape') {
            myShapes.forEach(shape => {
                shape.drag = false;
            });
            dragMyShape = false;
            // console.log(myShapes)
        } else if (selectedOps == 'rotateCanvas') {
            stopRotate(e);
        }
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

function getAngle(cX, cY, mX, mY) {
    let rad = Math.atan2(mY - cY, mX - cX);
    return rad;
}

function beginRotate(event) {
    let offX = model.canvas.getBoundingClientRect().left;
    let offY = model.canvas.getBoundingClientRect().top;
    // centerX = 0.5 * model.canvas.width;
    // centerY = 0.5 * model.canvas.height;
    centerX = 0; // begining of the canvas in X axis
    centerY = 0; // begining of the canvas in Y axis

    // console.log(model.canvas.width,model.canvas.height)
    let m1x = centerX + offX;
    let m1y = centerY + offY;
    let m2x = event.clientX;
    let m2y = event.clientY;

    prevAngle = getAngle(m1x, m1y, m2x, m2y);
    mouseDownAngle = prevAngle - model.angleInRad;
}

function onRotate(event) {
    let offX = model.canvas.getBoundingClientRect().left;
    let offY = model.canvas.getBoundingClientRect().top;

    let m1x = centerX + offX;
    let m1y = centerY + offY;
    let m2x = event.clientX;
    let m2y = event.clientY;

    let currAngle = this.getAngle(m1x, m1y, m2x, m2y);

    model.angleInRad = getCorrectedRadians(currAngle - mouseDownAngle);
    let changeInAngle = currAngle - (prevAngle - model.angleInRad);
    console.log('changeInAngle', changeInAngle)
    prevAngle = currAngle;
    doShapeRotation();
}
function stopRotate(event) {
    // TODO -- add any code required on stoping rotation
}

function doShapeRotation() {
    for (const shape of myShapes) {
        rotateShapePoints(shape)
    }
    clear();
    drawShape();
    updateRotationInfoLabel();
}

function getRotatedPoint(point, angle) {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    let newx = Math.floor(point.x * cos - point.y * sin);
    let newy = Math.floor(point.x * sin + point.y * cos);
    let newPoint = new Point(newx, newy);
    return newPoint;
}

function rotateShapePoints(shape) {
    let width = shape.end.x - shape.start.x;
    let height = shape.end.y - shape.start.y;

    shape.start = getRotatedPoint(shape.rotStart, model.angleInRad)

    shape.end.x = shape.start.x + width;
    shape.end.y = shape.start.y + height;
}

function updateRotationInfoLabel() {
    let rotationInfoElem = document.getElementById('labelCanvasRotation');
    let angle = toFixed(toDegrees(toFixed(model.angleInRad, 5)), 2);
    rotationInfoElem.innerText = angle;
}

function toDegrees(radians) {
    let angleInDegree = 0;
    angleInDegree = radians * (180 / Math.PI);
    return angleInDegree;
}

function toRadians(degrees) {
    let angleInRadians = 0;
    angleInRadians = degrees * (Math.PI / 180);
    return angleInRadians;
}

function getCorrectedRadians(rad) {
    if (rad < 0) {
        rad += Math.PI * 2;
    }
    else if (rad > 6.28319) {
        rad -= Math.PI * 2;
    }
    return rad;
}

function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return Number(Math.round(value * power) / power);
}

function resetRotation() {
    model.angleInRad = 0;
    doShapeRotation();
}