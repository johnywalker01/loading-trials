var model = {
    context: {},
    cnv: {},
    width: 210,
    height: 150,
    x: 10,
    y: 10,
    bgColor: "#ff00aa"
};

// offset position of canvas
var offX, offY;
// contains last mouse pointer axis on screen, while mouse move event.
var lastX, lastY;
// contains the mouse down point on screen, until the mouse up event.
var clickPoint = null;
// contains the image to display in canvas
var csImage = new Image;

// Constructor function for Point objects
function Point(xAxix, yAxis) {
    this.xAxis = xAxix;
    this.yAxis = yAxis;
}

function onBodyLoad() {
    // setup canvas
    model.cnv = document.getElementById('myCanvas');
    model.context = model.cnv.getContext('2d');

    initImage();

    offX = model.cnv.offsetLeft;
    offY = model.cnv.offsetTop;
}

/** 
 * load image to a global variable then, it will be loading to the canvas. 
 * */
function initImage() {
    csImage.onload = function () {
        updateShape(new Point(model.x, model.y));
    };
    csImage.src = 'http://www.biobest.co.uk/assets/images/home/blood-samples-web.jpg';
}

function updateClickPoint(event) {
    lastX = event.offsetX || (event.pageX - this.offX);
    lastY = event.offsetY || (event.pageY - this.offY);
    clickPoint = new Point(lastX, lastY);
}


function getPanValue(nX, nY) {
    let updatedX = nX - lastX;
    let updatedY = nY - lastY;
    return new Point(model.x += updatedX, model.y += updatedY);
}

function mousedown(event) {
    model.cnv.className = 'grabbing';
    updateClickPoint(event);
}

function mousemove(event) {
    let newX = event.offsetX || (event.pageX - this.offX);
    let newY = event.offsetY || (event.pageY - this.offY);
    // calculate move angle minus the angle onclick
    if (clickPoint != null) {
        let panValue = getPanValue(newX, newY);
        updateShape(panValue);

        lastX = newX;
        lastY = newY;
    } else {
        model.cnv.className = 'grab';
    }
}

function mouseup(event) {
    model.cnv.className = 'grab';
    clickPoint = null;
}

/**
 * update canvas with shape or image
 */
function updateShape(point) {
    model.context.clearRect(0, 0, model.cnv.width, model.cnv.height);
    model.cnv.width = model.cnv.width;

    var width = model.width;
    var height = model.height;

    model.context.setTransform(1, 0, 0, 1, 0, 0);

    let dx = point.xAxis + 0.5 * width;
    let dy = point.yAxis + 0.5 * height;
    model.context.translate(dx, dy);
	model.context.rotate(0.7931);
    // model.context.fillStyle = model.bgColor;
    // model.context.fillRect(-0.5 * width, -0.5 * height, width, height);
    model.context.drawImage(this.csImage, -0.5 * width, -0.5 * height, width, height);
}