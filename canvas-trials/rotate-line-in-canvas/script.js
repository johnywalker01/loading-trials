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

// offset position of canvas
var offX, offY;

function onBodyLoad() {
    // setup canvas
    model.canvas = document.getElementById('myCanvas');
    model.ctx = model.canvas.getContext('2d');
    offX = model.canvas.offsetLeft;
    offY = model.canvas.offsetTop;

    model.canvas.width = model.width;
    model.canvas.height = model.height;
    clear();
    drawLine();
}

function drawLine() {
    let rotationElem = document.getElementById('rotateInput');
    let angleInDegree = rotationElem.value;

    let angleInRadians = angleInDegree * (Math.PI / 180);

    console.log('angleInDegree', angleInDegree, 'angleInRadians', angleInRadians)

    let width = model.width;
    let height = model.height;
    let cx = Math.floor(width / 2);
    let cy = Math.floor(height / 2);
    let radius = model.radius;
    
    model.ctx.strokeStyle = "red";
    
    let x = Math.floor(cx + radius * Math.cos(angleInRadians));
    let y = Math.floor(cy + radius * Math.sin(angleInRadians));
    console.log('x', x, 'y', y)
    
    model.ctx.beginPath();
    model.ctx.moveTo(cx, cy);
    model.ctx.lineTo(x, y);
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
    clear();
    drawLine();
}