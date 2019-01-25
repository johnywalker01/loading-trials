var model = {
    context: {},
    cnv: {},
    width: 200,
    height: 150,
    x: 50,
    y: 50,
    bgColor: "#ff00aa"
};

var offX, offY;
var lastX, lastY;
var clickPoint = null;
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
        updateShape();
    };
    csImage.src = 'http://www.biobest.co.uk/assets/images/home/blood-samples-web.jpg';
}

function updateClickPoint(event) {
    lastX = event.offsetX || (event.pageX - this.offX);
    lastY = event.offsetY || (event.pageY - this.offY);
    // console.log('clicked X ' + lastX + '\tY ' + lastY);
    clickPoint = new Point(lastX, lastY);
}


function updateNewAxis(nX, nY) {
    // console.log('nX ' + nX + '\tnY ' + nY);
    let updatedX = nX - lastX;
    let updatedY = nY - lastY;
    model.x += updatedX;
    model.y += updatedY;
    // console.log('updatedX ' + updatedX + '\tupdatedY ' + updatedY);
    // console.log('updatedX ' + (model.x) + '\tupdatedY ' + (model.y));
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
        updateNewAxis(newX, newY)
        updateShape();

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


// init canvas
function updateShape() {
    model.context.clearRect(0, 0, 300, 300);
    model.cnv.width = model.cnv.width;

    var x = model.x;
    var y = model.y;
    var width = model.width;
    var height = model.height;

    model.context.setTransform(1, 0, 0, 1, 0, 0);

    let dx = x + 0.5 * width;
    let dy = y + 0.5 * height;
    // console.log('dx ' + (dx) + '\tdy ' + (dy));
    model.context.translate(dx, dy);
    // model.context.fillStyle = model.bgColor;
    // model.context.fillRect(-0.5 * width, -0.5 * height, width, height);
    model.context.drawImage(this.csImage, -0.5 * width, -0.5 * height, width, height);
}