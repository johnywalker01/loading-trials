var model = {
    context: {},
    cnv: {},
    angle: 0, // rotate angle
    width: 200, // image/shape width
    height: 200, // image/shape height
    x: 0, // drawing position from x in canvas
    y: 0, // drawing position from y in canvas
    sf: 1, // scale factor
    bgColor: "#ff00aa"
};

var cX, cY;
var mX, mY = 0;
var offX, offY;
var clickAngle = null;
var csImage = new Image;

function onBodyLoad() {
    // csImage.src = 'http://www.biobest.co.uk/assets/images/home/blood-samples-web.jpg';

    // setup canvas
    model.cnv = document.getElementById('myCanvas');
    model.context = model.cnv.getContext('2d');

    initImage();

    offX = model.cnv.offsetLeft;
    offY = model.cnv.offsetTop;

    initMyDiv();
}

// init canvas
function updateShape(ang) {
    model.context.clearRect(0, 0, 300, 300);
    model.cnv.width = model.cnv.width;

    var x = model.x;
    var y = model.y;
    var width = model.width;
    var height = model.height;

    let dx = x + 0.5 * width;
    let dy = y + 0.5 * height;

    let zoomValue = model.sf;

    model.context.setTransform(zoomValue, 0, 0, zoomValue, dx, dy);

    let sx = width * 0.5;
    let sy = height * 0.5;
    console.log('image start x ' + sx + '\t' + 'y ' + sy);

    model.context.rotate(ang);
    // model.context.fillStyle = model.bgColor;
    // model.context.fillRect(-0.5 * width, -0.5 * height, width, height);
    model.context.drawImage(this.csImage, -sx, -sy, width, height);
}
/** 
 * load image to a global variable then, it will be loading to the canvas. 
 * */
function initImage() {
    csImage.onload = function () {
        updateShape(model.angle);
    };
    csImage.src = 'https://i3.radionomy.com/radios/400/04f01941-8b3c-4c49-ad76-0efcf76cde91.jpg';
}

function mousedown(event) {
    model.cnv.className = 'grabbing';
	// setting center axis
	cX = model.x + model.width * 0.5;
    cY = model.y + model.height * 0.5;
    console.log('center X ' + cX + '\tcenterY ' + cY);
    // calculate click angle minus the last angle
    clickAngle = getAngle(cX + offX, cY + offY, event.clientX, event.clientY) - model.angle;
}

function mousemove(event) {
    // console.log("Mouse point x " + (event.clientX-offX)+'\t'+'y '+(event.clientY-offY));
    // calculate move angle minus the angle onclick
    if (clickAngle != null) {
        model.angle = (getAngle(cX + offX, cY + offY, event.clientX, event.clientY) - clickAngle);
        // console.log("model.angle " + model.angle);
        updateShape(model.angle);
    } else {
        model.cnv.className = 'grab';
    }
}

function mouseup(event) {
    model.cnv.className = 'grab';
    clickAngle = null;
}

/**
 * angle helper function
 */
function getAngle(cX, cY, mX, mY) {
    var angle = Math.atan2(mY - cY, mX - cX);
    return angle;
}

var myDiv;

function initMyDiv() {
    myDiv = document.getElementById("myD");
    myDiv.className = 'grab';
    myDiv.addEventListener("mousedown", (event) => {
        // console.log('mousedown ' + event.type);
        myDiv.className = 'grabbing';
    }, false);
    myDiv.addEventListener("mouseup", (event) => {
        // console.log('mouseup ' + event.type);
        myDiv.className = 'grab';
    }, false);
}