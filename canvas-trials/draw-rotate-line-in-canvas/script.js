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
var radius = 0;
var width;
var height;
var cx;
var cy;

// offset position of canvas
var offX, offY;


// Constructor function for Point objects
function Point(xAxix, yAxis) {
    this.xAxis = xAxix;
    this.yAxis = yAxis;
}

function onBodyLoad() {
    // setup canvas
    model.canvas = document.getElementById('myCanvas');
    model.ctx = model.canvas.getContext('2d');
    offX = model.canvas.offsetLeft;
    offY = model.canvas.offsetTop;

    model.canvas.width = model.width;
    model.canvas.height = model.height;

    doAction();
}

function setDrawingValues() {
    let radiusElem = document.getElementById('radiusInput');
    radius = Number(radiusElem.value);

    // radius += 2;
    console.log('radius', radius)

    width = model.width;
    height = model.height;
    cx = Math.floor(width / 2);
    cy = Math.floor(height / 2);
}

function drawLine() {
    let step = 20;
    model.ctx.strokeStyle = "red";

    for (let theta = step; theta <= 360; theta += step) {
        let angleInDegree = theta;
        let angleInRadians = angleInDegree * (Math.PI / 180);
        console.log('angleInDegree', angleInDegree, 'angleInRadians', angleInRadians)
        let x = Math.floor(cx + radius * Math.cos(angleInRadians));
        let y = Math.floor(cy + radius * Math.sin(angleInRadians));
        console.log('x', x, 'y', y)

        model.ctx.beginPath();
        model.ctx.moveTo(cx, cy);
        model.ctx.lineTo(x, y);
        model.ctx.stroke();
    }
}

function drawCircle() {
    model.ctx.beginPath();
    model.ctx.arc(cx, cy, (radius+1), 0, 2 * Math.PI);
    model.ctx.stroke();
}


function clear() {
    model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
    model.canvas.width = model.canvas.width;
}

/** 
 * redraw circle with user given radius. 
 * */
function doAction() {
    setDrawingValues();
    clear();
    drawLine();
    drawCircle()
}