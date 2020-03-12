let model = {
    ctx: {},
    canvas: {},
    width: 500,
    height: 500,
    lineWidth: 1,
    imageOrder: 'imageBefore',
    shapeMode: 'fill',
    rectSize: 250
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
    model.ctx.rect(100, 100, model.rectSize, model.rectSize);

    if (model.shapeMode == 'fill') {
        // drawing the rectangle by fill method
        model.ctx.fillStyle = '#F00';
        model.ctx.fill();
    }
    else if (model.shapeMode == 'stroke') {
        // drawing the rectangle by stroke method
        model.ctx.lineWidth = model.lineWidth;
        model.ctx.strokeStyle = '#F00';
        model.ctx.stroke();
    }
}
// handle line width slider onInput event.
function onChangeImageDrawingOrder() {
    model.imageOrder = document.getElementById('imageOrder').value;

    updateCanvasLayer();
}
// handle line width slider onInput event.
function onChangeShapeDrawingMode() {
    model.shapeMode = document.getElementById('shapeMode').value;

    updateCanvasLayer();
}
// handle line width slider onInput event.
function onInputLineWidth() {
    model.lineWidth = document.getElementById('lineWidth').value;
    document.getElementById("lineWidthValue").innerHTML = model.lineWidth;

    updateCanvasLayer();
}
// handle rectangle size slider onInput event.
function onInputRectSize() {
    model.rectSize = document.getElementById('rectSize').value;
    document.getElementById("rectSizeValue").innerHTML = model.rectSize;

    updateCanvasLayer();
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