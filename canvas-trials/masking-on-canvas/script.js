let model = {
    ctx: {},
    canvas: {},
    width: 500,
    height: 500,
    imageOrder: 'imageBefore',
};
let shape = {
    lineWidth: 10,
    shapeMode: 'fill',
    width: 250,
    height: 250,
    startX: 80,
    startY: 80
};

let canvasImage = new Image;

function onBodyUnLoad() { }

/**
 * set initial properties on html body load
 */
function onBodyLoad() {
    doInitialSettings();
    canvasImage.src = 'https://radmedix.com/wp-content/uploads/2016/09/radmedix-human_examples-Chest-PA-843x1024.jpg';
}
function doInitialSettings() {
    presetValues();
    initImage();
}

function presetValues() {
    // setup canvas
    model.canvas = document.getElementById('myCanvas');
    model.ctx = model.canvas.getContext('2d');
    model.canvas.width = model.width;
    model.canvas.height = model.height;
}
function initImage() {
    canvasImage.onload = function () {
        updateCanvasLayer();
    };
}
function redrawImage(imageObj) {
    model.ctx.drawImage(imageObj, 0, 0);
}
function clearCanvas() {
    model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
    model.canvas.width = model.canvas.width;
}
function drawShape() {
    drawRectangle();
}

function drawRectangle() {
    // the rectangle segment
    model.ctx.beginPath();
    model.ctx.rect(shape.startX, shape.startY, shape.width, shape.height);

    if (shape.shapeMode == 'fill') {
        // drawing the rectangle by fill method
        model.ctx.fillStyle = '#F00';
        model.ctx.fill();
    }
    else if (shape.shapeMode == 'stroke') {
        // drawing the rectangle by stroke method
        model.ctx.lineWidth = shape.lineWidth;
        model.ctx.strokeStyle = '#F00';
        model.ctx.stroke();
    }
}

//plot Global Composite Operation based on image drawing order.
function updateCanvasLayer() {
    clearCanvas();
    if (model.imageOrder == 'imageBefore') {
        redrawImage(canvasImage);

        model.ctx.globalCompositeOperation = 'source-in';

        drawShape();
    }
    else if (model.imageOrder == 'imageLater') {
        drawShape();

        model.ctx.globalCompositeOperation = 'source-in';

        redrawImage(canvasImage);
    }
}

// handle line width slider onInput event.
function onChangeImageDrawingOrder() {
    model.imageOrder = document.getElementById('imageOrder').value;

    updateCanvasLayer();
}
// handle line width slider onInput event.
function onChangeShapeDrawingMode() {
    shape.shapeMode = document.getElementById('shapeMode').value;

    updateCanvasLayer();
}
// handle line width slider onInput event.
function onInputLineWidth() {
    shape.lineWidth = document.getElementById('lineWidth').value;
    document.getElementById("lineWidthValue").innerHTML = shape.lineWidth;

    updateCanvasLayer();
}
// handle rectangle size slider onInput event.
function onInputRectWidth() {
    shape.width = document.getElementById('rectWidth').value;
    document.getElementById("rectWidthValue").innerHTML = shape.width;

    updateCanvasLayer();
}
// handle line width slider onInput event.
function onInputStartX() {
    shape.startX = document.getElementById('rectX').value;
    document.getElementById("rectXValue").innerHTML = shape.startX;

    updateCanvasLayer();
}
// handle rectangle size slider onInput event.
function onInputStartY() {
    shape.startY = document.getElementById('rectY').value;
    document.getElementById("rectYValue").innerHTML = shape.startY;

    updateCanvasLayer();
}
// handle rectangle size slider onInput event.
function onInputRectHeight() {
    shape.height = document.getElementById('rectHeight').value;
    document.getElementById("rectHeightValue").innerHTML = shape.height;

    updateCanvasLayer();
}
