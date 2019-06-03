var model = {
    ctx: {},
    canvas: {},
    width: 500,
    height: 500,
    x: 0,
    y: 0,
    bgColor: "#ff00aa"
};

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

    doAction();
}

/** 
 * redraw circle with user given radius. 
 * */
function doAction() {
    var radiusElem = document.getElementById('radiusInput');
    var radius = radiusElem.value;
    var width = model.width;
    var height = model.height;
    model.canvas.width = width;
    model.canvas.height = height;
    let cx = Math.floor(width / 2);
    let cy = Math.floor(height / 2);
    console.log('cx',cx,'cy',cy)
    
    model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
    model.canvas.width = model.canvas.width;

    let r=radius;
    let x = 0, y=0;
    for (let theta = 0; theta <= 360; theta += 30) {

        model.ctx.beginPath();
        x = Math.floor(cx + r * Math.cos(theta));
        y = Math.floor(cy + r * Math.sin(theta));

        model.ctx.strokeStyle= "red";

        // model.ctx.arc(x, y, 3, 0, Math.PI * 2);

        // model.ctx.moveTo(x-20,y-20);
        // model.ctx.lineTo(x,y);

        model.ctx.rect(x, y, 20, 20);

        // model.ctx.fill();
        model.ctx.stroke();
        model.ctx.closePath();
        // model.ctx.restore();
        
        console.log('x',x,'y',y,'theta',theta)

    }
}