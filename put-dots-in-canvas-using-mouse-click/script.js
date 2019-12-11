let model = {
    ctx: {},
    canvas: {},
    width: 500,
    height: 500,
    angleInRad: 0
};
let radius = 2;
let width;
let height;

let offsetX;
let offsetY;

function Position(x, y) {
    this.x = x;
    this.y = y;
}

function onBodyUnLoad() {}

/**
 * set initial properties on html body load
 */
function onBodyLoad() {
    // setup canvas
    model.canvas = document.getElementById('myCanvas');
    model.ctx = model.canvas.getContext('2d');
    offsetX = model.canvas.offsetLeft;
    offsetY = model.canvas.offsetTop;
    console.log('offsetX', offsetX, 'offsetY', offsetY)

    model.canvas.width = model.width;
    model.canvas.height = model.height;

    // listen for mouse events
    model.canvas.onmousedown = mouseDown;
    model.canvas.onmousemove = mouseMove;

    redrawAll();
}

function clear() {
    model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
    model.canvas.width = model.canvas.width;
}

function rotateContext() {
    let rotationElem = document.getElementById('rotateInput');
    angleInDegree = rotationElem.value;

    let angleInRadians = angleInDegree * (Math.PI / 180);
    model.ctx.rotate(angleInRadians);
    model.angleInRad = angleInRadians;

    // for identifying the context.
    model.ctx.fillStyle = "#eeeeff";
    model.ctx.fillRect(0, 0, model.canvas.width, model.canvas.height);
}
/**
 * clear and rotate the context.
 */
function redrawAll() {
    clear();
    rotateContext();
}

/**
 * for getting upadated mouse positions; after rotation.
 * @param {*} coords 
 */
function getTransformedCoords(coords) {
    var angle = (model.angleInRad * -1);
    var x2 = coords.x;
    var y2 = coords.y;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    var newx = Math.floor(x2 * cos - y2 * sin);
    var newy = Math.floor(x2 * sin + y2 * cos);

    return new Position(newx, newy);
}

// handle mousedown events
function mouseDown(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let mx = Math.floor(e.offsetX || (e.pageX - offsetX));
    let my = Math.floor(e.offsetY || (e.pageY - offsetY));
	console.log('cmx', mx, 'cmy', my);
	
    if (model.angleInRad > 0) {
        let pos = getTransformedCoords(new Position(mx, my));
        mx = pos.x;
        my = pos.y;
    }
    // draw a tiny dot to identify mouse point in the context; on mouse down
    drawDot(mx, my);
}

/**
 * put a dot in the canvas where ever mouse clicks.
 * @param {*} mx 
 * @param {*} my 
 */
function drawDot(mx, my) {
    model.ctx.beginPath();
    model.ctx.fillStyle = "#ff3333";
    model.ctx.arc(mx, my, (radius), 0, 2 * Math.PI);
    model.ctx.fill();
    console.log('dot has been put at ', 'mx', mx, 'my', my)
}

// handle mousedown events
function mouseMove(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    let mx = Math.floor(e.offsetX || (e.pageX - offsetX));
    let my = Math.floor(e.offsetY || (e.pageY - offsetY));

    // draw a tiny dot to identify mouse point in the context; on mouse down
    updateMouseLabels(mx, my);
}

function updateMouseLabels(mx, my) {
    let xLbl = document.getElementById('mouseXLbl');
    xLbl.innerText = mx;
    let yLbl = document.getElementById('mouseYLbl');
    yLbl.innerText = my;
}