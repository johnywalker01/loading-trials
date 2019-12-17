
/**
 * set initial properties on html body load
 */
function onBodyLoad() {
    // setup canvas
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");

    ctx.fillStyle = '#EC5039';
    ctx.fillRect(10, 10, 50, 100);

    ctx.beginPath();
    ctx.arc(35, 45, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#0033FF';
    ctx.fill();
}
function copy() {
    let srcCanvas = document.getElementById("myCanvas");
    let srcCtx = srcCanvas.getContext("2d");
    let destCanvas = document.getElementById("myCanvas2");
    let destCtx = destCanvas.getContext("2d");

    const imgData = srcCtx.getImageData(10, 10, 50, 100);

    let tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = imgData.width; tmpCanvas.height = imgData.height;
    tmpCanvas.getContext('2d').putImageData(imgData, 0, 0);

    // destCtx.scale(2, 2);
    destCtx.drawImage(tmpCanvas, 10, 10);
}
