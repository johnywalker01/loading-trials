let iModel = {
    ctx: {},
    canvas: {},
    scale: 1
};
let sModel = {
    ctx: {},
    canvas: {},
    scale: 1
};

const canvasWidth = 500;
const canvasHeight = 500;

let width;
let height;

let offsetX;
let offsetY;

var canvasImage = new Image;
let drawShape = false;
/**
 * object for shape co-ordiantes
 */
let myShape = {
    startPoint: new Point(0, 0),
    endPoint: new Point(0, 0),
    cStartPoint: new Point(0, 0),
    cEndPoint: new Point(0, 0)
}
let lastExponentValue = 0;
let scaleFactor = 1.01;
let scaleStepper = 1;
let selectedShape = 'line';

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function onBodyUnLoad() {}

/**
 * set initial properties on html body load
 */
function onBodyLoad() {
    // setup canvas
    initImageCanvasModel();
    initShapeCanvasModel();
    doInitialSettings();

    // canvasImage.src = 'https://www.spaceanswers.com/wp-content/uploads/2019/01/as11-44-6667.jpg';
    canvasImage.src = 'https://www.mathgoodies.com/sites/all/modules/custom/lessons/images/graphs/construct_line_incorrect.jpg';

    addMouseEventListeners();
}

function initImageCanvasModel() {
    iModel.canvas = document.getElementById('myCanvas');
    iModel.ctx = iModel.canvas.getContext('2d');

    iModel.canvas.width = canvasWidth;
    iModel.canvas.height = canvasHeight;
}

function initShapeCanvasModel() {
    sModel.canvas = document.getElementById('myCanvas2');
    sModel.ctx = sModel.canvas.getContext('2d');

    sModel.canvas.width = canvasWidth;
    sModel.canvas.height = canvasHeight;
}

function addMouseEventListeners() {
    // listen for mouse events
    sModel.canvas.onmousedown = mouseDown;
    sModel.canvas.onmousemove = mouseMove;
    sModel.canvas.onmouseup = mouseUp;
}

function doInitialSettings() {
    presetValues();
    initImage();
}

function presetValues() {
    let canvasDiv = document.getElementById('canvasDiv');
    // console.log(canvasDiv)
    offsetX = canvasDiv.offsetLeft;
    offsetY = canvasDiv.offsetTop;
    console.log('offsetX', offsetX, 'offsetY', offsetY)
}

function initImage() {
    canvasImage.onload = function () {
        redrawImage(canvasImage);
    };
}

function redrawImage(imageObj) {
    iModel.ctx.drawImage(imageObj, 0, 0);
}

function clear(canvas) {
    if (canvas == 'image') {
        clearImodel();
    } else if (canvas == 'shape') {
        clearSmodel();
    } else {
        clearSmodel();
        clearImodel();
    }
}

function clearSmodel() {
    sModel.ctx.clearRect(0, 0, sModel.canvas.width, sModel.canvas.height);
    sModel.canvas.width = sModel.canvas.width;
    // console.log('clearSmodel');
}

function clearImodel() {
    iModel.ctx.clearRect(0, 0, iModel.canvas.width, iModel.canvas.height);
    iModel.canvas.width = iModel.canvas.width;
}

function startScaleContext(goUp = true) {
    let upOrDown = 1;
    if (!goUp) {
        upOrDown = -1;
    }

    let exponent = lastExponentValue + (scaleStepper * upOrDown);
    console.log('exponent', exponent)
    let zoomValue = Math.pow(scaleFactor, exponent);

    // upate scale display label
    let scaleLabelElem = document.getElementById('scaleLbl');
    scaleLabelElem.innerText = zoomValue;

    clear('image');
    scaleCtx(zoomValue);
    redrawImage(canvasImage);
    // console.log('newScale', newScale)

    updateShapeData(zoomValue);
    clear('shape');

    if (selectedShape == 'line') {
        drawLine(myShape.endPoint);
    } else if (selectedShape == 'rectangle') {
        drawRectangle(myShape.endPoint);
    }


    lastExponentValue = exponent;
}

function scaleCtx(scaleValue = 1) {
    iModel.scale = scaleValue;
    iModel.ctx.scale(scaleValue, scaleValue);
}

function doScaleOperation(goUp = true) {
    startScaleContext(goUp);
}

function stepUp() {
    doScaleOperation(true);
}

function stepDown() {
    doScaleOperation(false);
}

function updateShapeData(zoomValue) {
    console.log('iModel.scale', iModel.scale)

    console.log('zoomValue', zoomValue)
    let newSx = getPix(myShape.cStartPoint.x * zoomValue);
    let newSy = getPix(myShape.cStartPoint.y * zoomValue);
    let newEx = getPix(myShape.cEndPoint.x * zoomValue);
    let newEy = getPix(myShape.cEndPoint.y * zoomValue);
    // console.log('newSx', newSx, 'newEx', newEx)

    myShape.startPoint = new Point(newSx, newSy);
    myShape.endPoint = new Point(newEx, newEy)

}


// handle mousedown events
function mouseDown(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let mx = Math.floor(e.offsetX || (e.pageX - offsetX));
    let my = Math.floor(e.offsetY || (e.pageY - offsetY));

    myShape.startPoint = new Point(mx, my);
    if (iModel.scale != 1) {
        myShape.cStartPoint = new Point(getPix(mx / iModel.scale), getPix(my / iModel.scale));
    } else {
        myShape.cStartPoint = new Point(mx, my);
    }

    drawShape = true;
}

// handle mouseup events
function mouseUp(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let mx = Math.floor(e.offsetX || (e.pageX - offsetX));
    let my = Math.floor(e.offsetY || (e.pageY - offsetY));

    // for drawing horizontal line, make y axis constant; only if user pressed SHIFT Key while dragging.
    if (e.shiftKey) {
        my = myShape.startPoint.y;
    }

    myShape.endPoint = new Point(mx, my);
    if (iModel.scale != 1) {
        myShape.cEndPoint = new Point(getPix(mx / iModel.scale), getPix(my / iModel.scale));
    } else {
        myShape.cEndPoint = new Point(mx, my);
    }

    drawShape = false;
}

// handle mousedown events
function mouseMove(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let mx = Math.floor(e.offsetX || (e.pageX - offsetX));
    let my = Math.floor(e.offsetY || (e.pageY - offsetY));

    if (drawShape) {
        clear('shape');

        if (selectedShape == 'line') {
            // for drawing horizontal line, make y axis constant; only if user pressed SHIFT Key while drawing.
            if (e.shiftKey) {
                my = myShape.startPoint.y;
            }
            drawLine(new Point(mx, my));
        } else if (selectedShape == 'rectangle') {
            drawRectangle(new Point(mx, my))
        }
    }
    updateMouseLabels(e);
}

function drawLine(point = new Point(0, 0)) {
    const x1 = myShape.startPoint.x;
    const y1 = myShape.startPoint.y;
    const x2 = point.x;
    const y2 = point.y;

    sModel.ctx.strokeStyle = 'red';
    sModel.ctx.lineWidth = 4;
    sModel.ctx.beginPath();
    sModel.ctx.moveTo(x1, y1);
    sModel.ctx.lineTo(x2, y2);
    sModel.ctx.stroke();
}

function drawRectangle(point = new Point(0, 0)) {
    sModel.ctx.strokeStyle = 'red';

    const width = point.x - myShape.startPoint.x;
    const height = point.y - myShape.startPoint.y;
    const x = myShape.startPoint.x;
    const y = myShape.startPoint.y;
    sModel.ctx.lineWidth = 1;
    sModel.ctx.rect(x, y, width, height);
    sModel.ctx.stroke();
}

function updateMouseLabels(e) {
    let screenLog = document.querySelector('#screen-log');

    // get the current mouse position
    let mx = Math.floor(e.offsetX || (e.pageX - offsetX));
    let my = Math.floor(e.offsetY || (e.pageY - offsetY));

    let cx = e.clientX - offsetX;
    let cy = e.clientY - offsetY;

    screenLog.innerText = `
    X/Y: ${mx}, ${my}
    Client X/Y: ${cx}, ${cy}`;
}

function getPix(num) {
    return Number(num.toFixed(1));
}

function onShapeChange() {
    let shape = document.querySelector('input[name="shape"]:checked').value;
    console.log('shape', shape)
    selectedShape = shape;
}