var model = {
    ctx: {},
    canvas: {},
    width: 500,
    height: 500,
    x: 0,
    y: 0,
    radius: 180,
    bgColor: "#ff00aa"
};
var radius = 150;
var width;
var height;
var cx;
var cy;
var clockTimer;
var stepper = 20;
var theta = 0;

function onBodyUnLoad() {
    clearInterval(clockTimer);
}

function onBodyLoad() {
    // setup canvas
    model.canvas = document.getElementById('myCanvas');
    model.ctx = model.canvas.getContext('2d');
    offX = model.canvas.offsetLeft;
    offY = model.canvas.offsetTop;

    model.canvas.width = model.width;
    model.canvas.height = model.height;

    setDrawingValues();
    startAction();
}

function setDrawingValues() {
    width = model.width;
    height = model.height;
    cx = Math.floor(width / 2);
    cy = Math.floor(height / 2);
}

function drawLine() {
    model.ctx.strokeStyle = "red";

    let angleInDegree = theta;
    let angleInRadians = angleInDegree * (Math.PI / 180);
    // console.log('angleInDegree', angleInDegree, 'angleInRadians', angleInRadians)
    let x = Math.floor(cx + radius * Math.cos(angleInRadians));
    let y = Math.floor(cy + radius * Math.sin(angleInRadians));
    // console.log('x', x, 'y', y)

    model.ctx.beginPath();
    model.ctx.moveTo(cx, cy);
    model.ctx.lineTo(x, y);
    model.ctx.stroke();

}

function incrementTheta() {
    if (theta >= 360) {
        theta = stepper;
    } else {
        theta += stepper;
    }
    // console.log('theta',theta)
}

function drawCircle() {
    model.ctx.beginPath();
    model.ctx.arc(cx, cy, (radius + 1), 0, 2 * Math.PI);
    model.ctx.stroke();
}

function clear() {
    model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
    model.canvas.width = model.canvas.width;
}

/** 
 * redraw circle with user given radius. 
 * */
function startAction() {
    startTimer();
}

function startTimer() {
    clockTimer = setInterval(drawShapes, 1000);
}

function drawShapes() {
    clear();
    drawCircle();
    drawLine();
    incrementTheta();
}