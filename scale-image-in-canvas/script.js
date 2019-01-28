var model = {
    context: {},
    cnv: {},
    width: 210,
    height: 150,
    x: 10,
    y: 10,
    bgColor: "#ff6633",
    scalingFactor: 1.01
};

// offset position of canvas
var offX, offY;
// contains last mouse pointer axis on screen, while mouse move event.
var lastX, lastY;
// contains the mouse down point on screen, until the mouse up event.
var clickPoint = null;
// contains the image to display in canvas
var csImage = new Image;

var powFactor = 1;
var lastStoppedYvalue = 0;

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
    // updateShape(model.scalingFactor);

    offX = model.cnv.offsetLeft;
    offY = model.cnv.offsetTop;
}

/** 
 * load image to a global variable then, it will be loading to the canvas. 
 * */
function initImage() {
    csImage.onload = function () {
        updateShape(model.scalingFactor);
    };
    csImage.src = 'http://www.biobest.co.uk/assets/images/home/blood-samples-web.jpg';
}

function updateClickPoint(event, resetToNull = false) {
    if (!resetToNull) {
        lastX = event.offsetX || (event.pageX - this.offX);
        lastY = event.offsetY || (event.pageY - this.offY);
        clickPoint = new Point(lastX, lastY);
        restartingZoom = true;
    } else {
        lastStoppedYvalue = powFactor;
        // console.log('model.lastStoppedYvalue\t' + model.lastStoppedYvalue);
        clickPoint = null;
    }

}

function getZoomValue(nX, nY) {
    let updatedX = clickPoint.xAxis - nX;
    let updatedY = clickPoint.yAxis - nY;
    // console.log('updatedX ' + updatedX + '\tupdatedY ' + updatedY);

    powFactor = lastStoppedYvalue + updatedY;
    // console.log('powering Factor ' + powFactor );
    let zoomVal = Math.pow(model.scalingFactor, powFactor);
    return zoomVal;

    // if (updatedY < 0) {
    //     // console.log('DOWN');
    // } else if (updatedY > 0) {
    //     // console.log('UP');
    // }

}

function mousedown(event) {
    model.cnv.className = 'grabbing';
    updateClickPoint(event);
}

function mousemove(event) {
    let newX = event.offsetX || (event.pageX - this.offX);
    let newY = event.offsetY || (event.pageY - this.offY);

    if (clickPoint != null) {
        let zoomValue = getZoomValue(newX, newY);
        updateShape(zoomValue);

        lastX = newX;
        lastY = newY;
    } else {
        model.cnv.className = 'grab';
    }
}

function mouseup(event) {
    model.cnv.className = 'grab';
    updateClickPoint(event, true);
}

/**
 * update canvas with shape or image
 */
function updateShape(zoomValue) {
    model.context.clearRect(0, 0, model.cnv.width, model.cnv.height);
    // this is important.
    model.cnv.width = model.cnv.width;

    var x = model.x;
    var y = model.y;
    var width = model.width;
    var height = model.height;

    let dx = x + 0.5 * width;
    let dy = y + 0.5 * height;

    // console.log('zoomValue ' + zoomValue);
    model.context.setTransform(zoomValue, 0, 0, zoomValue, dx, dy);
    // model.context.fillStyle = model.bgColor;
    // model.context.fillRect(-0.5 * width, -0.5 * height, width, height);
    model.context.drawImage(this.csImage, -0.5 * width, -0.5 * height, width, height);
}