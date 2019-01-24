var model = {
    context: {},
    cnv: {},
    angle: 0,
    width: 200,
    height: 150,
    x: 50,
    y: 50,
    bgColor: "#ff00aa"
};

var cX, cY;
var mX, mY = 0;
var offX, offY;
var clickAngle = null;
var csImage = new Image;

function onBodyLoad() {
    csImage.src = 'http://www.biobest.co.uk/assets/images/home/blood-samples-web.jpg';

    // setup canvas
    model.cnv = document.getElementById('myCanvas');
    model.context = model.cnv.getContext('2d');

    rotateShape(model.angle); // display the rectangle/square
    offX = model.cnv.offsetLeft;
    offY = model.cnv.offsetTop;

    initMyDiv();
}

// init canvas
function rotateShape(ang) {
    model.context.clearRect(0, 0, 300, 300);
    model.cnv.width = model.cnv.width;

    var x = model.x;
    var y = model.y;
    var width = model.width;
    var height = model.height;

    model.context.setTransform(1, 0, 0, 1, 0, 0);
    cX = x + width * 0.5;
    cY = y + height * 0.5;
    // console.log('center X ' + cX + '\tcenterY ' + cY);
    model.context.translate(x + 0.5 * width, y + 0.5 * height);
    model.context.rotate(ang);
    model.context.fillStyle = model.bgColor;
    model.context.fillRect(-0.5 * width, -0.5 * height, width, height);
    // model.context.drawImage(this.csImage, -0.5 * width, -0.5 * height, width, height);
}

function mousedown(event) {
    model.cnv.className = 'grabbing';
    // calculate click angle minus the last angle
    clickAngle = getAngle(cX + offX, cY + offY, event.clientX, event.clientY) - model.angle;
}

function mousemove(event) {
    // calculate move angle minus the angle onclick
    if (clickAngle != null) {
        model.angle = (getAngle(cX + offX, cY + offY, event.clientX, event.clientY) - clickAngle);
        // console.log("model.angle " + model.angle);
        rotateShape(model.angle);
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