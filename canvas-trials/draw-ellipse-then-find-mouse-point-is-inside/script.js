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

const kappa = 0.5522848;

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

    canvasImage.crossOrigin = 'anonymous';
    // canvasImage.src = 'https://www.spaceanswers.com/wp-content/uploads/2019/01/as11-44-6667.jpg';
    // canvasImage.src = 'https://www.mathgoodies.com/sites/all/modules/custom/lessons/images/graphs/construct_line_incorrect.jpg';
    // canvasImage.src = 'https://noosaradiology.com.au/images/Modality_Images/xray.jpg';
    canvasImage.src = 'https://ichef.bbci.co.uk/news/660/cpsprodpb/EC6A/production/_103922506_mediaitem103922505.jpg';

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

    onShapeChange();
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
    switch (canvas) {
        case 'image':
            clearImodel();
            break;
        case 'shape':
            clearSmodel();
            break;

        default:
            clearSmodel();
            clearImodel();
            break;
    }
    // if (canvas == 'image') {
    //     clearImodel();
    // } else if (canvas == 'shape') {
    //     clearSmodel();
    // } else {
    //     clearSmodel();
    //     clearImodel();
    // }
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

    updateShapeData(zoomValue, upOrDown);
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

function updateShapeData(zoomValue, upOrDown) {
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
        drawNewShapes(e, mx, my);
    } else {
        initiateMouseInShapeCheck(mx, my);
    }
    updateMouseLabels(e);
}

function initiateMouseInShapeCheck(mx, my) {
    switch (selectedShape) {
        case 'ellipse':
            {
                if (checkWhetherMouseIsInsideEllipse(mx, my)) {
                    updateShapeFlagInUi('#11ff11');
                } else {
                    updateShapeFlagInUi('#ff1111');
                }
                break;
            }

        default:
            break;
    }
}

function checkWhetherMouseIsInsideEllipse(x, y) {

    let width = myShape.endPoint.x - myShape.startPoint.x;
    let height = myShape.endPoint.y - myShape.startPoint.y;

    if (width != 0 && height != 0) {
        let h = myShape.startPoint.x + width * 0.5;
        let k = myShape.startPoint.y + height * 0.5;

        let rx = h - myShape.startPoint.x;
        let ry = k - myShape.startPoint.y;

        const a = Math.pow((x - h), 2) / Math.pow(rx, 2);
        const b = Math.pow((y - k), 2) / Math.pow(ry, 2);

        const inclu = a + b;
        if (inclu <= 1) {
            // console.log('mouse checked inside ellipse', inclu)
            return true;
        } else {
            return false;
        }
    }

}

function updateShapeFlagInUi(color = 'red') {
    let shapeFlag = document.querySelector('#shape-flag');
    shapeFlag.style.backgroundColor = color;
}

function drawNewShapes(e, mx, my) {
    clear('shape');

    switch (selectedShape) {
        case 'line':
            {
                // for drawing horizontal line, make y axis constant; only if user pressed SHIFT Key while drawing.
                if (e.shiftKey) {
                    my = myShape.startPoint.y;
                }
                drawLine(new Point(mx, my));
                break;
            }
        case 'rectangle':
            {
                drawRectangle(new Point(mx, my));
                break;
            }
        case 'ellipse':
            {
                drawEllipse(new Point(mx, my));
                break;
            }

        default:
            break;
    }
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

function drawEllipse(point = new Point(0, 0)) {
    sModel.ctx.strokeStyle = 'red';
    // sModel.ctx.fillStyle = 'red';
    sModel.ctx.lineWidth = 1;

    let x = myShape.startPoint.x;
    let y = myShape.startPoint.y;
    let w = point.x - myShape.startPoint.x;
    let h = point.y - myShape.startPoint.y;

    let ox = (w / 2) * kappa; // control point offset horizontal
    let oy = (h / 2) * kappa; // control point offset vertical
    let xe = x + w; // x-end
    let ye = y + h; // y-end
    let xm = x + w / 2; // x-middle
    let ym = y + h / 2; // y-middle

    sModel.ctx.beginPath();
    sModel.ctx.moveTo(x, ym);
    sModel.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    sModel.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    sModel.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    sModel.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    sModel.ctx.stroke();
    // sModel.ctx.fill();

    checkRoi(point)
}

function checkRoi(point = new Point(0, 0)) {

    // ------ Coloring ellipse mask with red  --- //
    // ------ atempt 1 --- //
    let x = myShape.startPoint.x;
    let y = myShape.startPoint.y;
    let w = point.x - myShape.startPoint.x;
    let h = point.y - myShape.startPoint.y;
    try {
        let imgData = iModel.ctx.getImageData(x, y, w, h);
        // console.log("ImageData", imgData);
        pixelToRed(imgData, iModel.ctx, myShape.startPoint, w, h);
    } catch (error) {
        console.error(error);
    }


    // ------ atempt 2 --- //
    // let w = point.x - myShape.startPoint.x;
    // let h = point.y - myShape.startPoint.y;
    // try {
    //     for (let ix = myShape.startPoint.x; ix <= w; ix++) {
    //         for (let iy = myShape.startPoint.y; iy <= h; iy++) {
    //             // console.log(ix,iy)
    //             if (checkWhetherMouseIsInsideEllipse(ix, iy)) {
    //                 let imgData = iModel.ctx.getImageData(ix, iy, 1, 1);
    //                 // console.log("ImageData", imgData);
    //                 pixelToRed(imgData, iModel.ctx, new Point(ix, iy));
    //             }
    //         }

    //     }
    // } catch (error) {
    //     console.error(error);
    // }

}

// function checkingAlgorithm1(mx, my) {
//     let x = myShape.startPoint.x;
//     let y = myShape.startPoint.y;
//     let w = myShape.endPoint.x - myShape.startPoint.x;
//     let h = myShape.endPoint.y - myShape.startPoint.y;
//     let imgData = iModel.ctx.getImageData(x, y, w, h);
//     console.log("ImageData", imgData);

//     imgToNegative(imgData, iModel.ctx, mx, my);
// }

function pixelToRed(imgData, context, point = new Point(0, 0), width) {
    for (var i = 0, len = imgData.data.length; i < len; i += 4) {
        let r = imgData.data[i + 0];
        let g = imgData.data[i + 1];
        let b = imgData.data[i + 2];
        let a = imgData.data[i + 3];

        if (r > 3 && g > 3 && b > 3 && a > 3) {
            imgData.data[i + 0] = 255;
            imgData.data[i + 1] = 10;
            imgData.data[i + 2] = 10;
            imgData.data[i + 3] = 150;
        }
        // let x = (i / 4) % width;
        // let y = Math.floor((i / 4) / width);
        // if (checkWhetherMouseIsInsideEllipse(x, y)) {
        // }
    }
    clear('image');
    redrawImage(canvasImage);
    context.putImageData(imgData, point.x, point.y);

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

    myShape.startPoint = new Point(0, 0);
    myShape.endPoint = new Point(0, 0);
    myShape.cStartPoint = new Point(0, 0);
    myShape.cEndPoint = new Point(0, 0);

    clear('shape');
}