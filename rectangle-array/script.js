// Constructor function for Point objects
function Point(xAxix, yAxis) {
    this.xAxis = xAxix;
    this.yAxis = yAxis;
}

function onBodyLoad() {
}

function processData() {
    try {
        var startX = Number(document.getElementById("num1x").value);
        var startY = Number(document.getElementById("num1y").value);
        var endX = Number(document.getElementById("num2x").value);
        var endY = Number(document.getElementById("num2y").value);

        let rectPoint = [];
        let upperLimitX = (startX > endX) ? startX : endX;
        let upperLimitY = (startY > endY) ? startY : endY;
        let lowerLimitX = (startX < endX) ? startX : endX;
        let lowerLimitY = (startY < endY) ? startY : endY;
        let mx = lowerLimitX;
        let my = lowerLimitY;
        console.log({lowerLimitX},{lowerLimitY},{upperLimitX},{upperLimitY});
        
        do {
            rectPoint.push(new Point(mx++, my));
        } while (mx >= upperLimitX);
        
        // do {
        //     rectPoint.push(new Point(mx, my++));
        // } while (my >= upperLimitY);
        
        // do {
        //     rectPoint.push(new Point(mx--, my));
        // } while (mx <= lowerLimitX);
        
        // do {
        //     rectPoint.push(new Point(mx, my--));
        // } while (my <= upperLimitY);
        
        console.log({ rectPoint });
    } catch (e) {
        console.error(e);
    }
}
