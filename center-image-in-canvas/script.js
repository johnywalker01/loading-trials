var model = {
	context: {},
	canvas: {},
	angle: 0, // rotate angle
	width: 200, // image/shape width
	height: 200, // image/shape height
	x: 0, // drawing position from x in canvas
	y: 0, // drawing position from y in canvas
	sf: 1, // scale factor
	bgColor: "#ff00aa"
};

var offX, offY;

var csImage = new Image;

function onBodyLoad() {

	// setup canvas
	model.canvas = document.getElementById('myCanvas');
	model.context = model.canvas.getContext('2d');

	initImage();

	offX = model.canvas.offsetLeft;
	offY = model.canvas.offsetTop;
}

/** 
 * load image to a global variable then, it will be loading to the canvas. 
 * */
function initImage() {
	csImage.onload = function () {
		fitImageOn(model.canvas, csImage)
	};
	csImage.src = 'http://www.biobest.co.uk/assets/images/home/blood-samples-web.jpg';
	// csImage.src = 'https://i3.radionomy.com/radios/400/04f01941-8b3c-4c49-ad76-0efcf76cde91.jpg';
}

var fitImageOn = function (canvas, imageObj) {
	var imageAspectRatio = imageObj.width / imageObj.height;
	var canvasAspectRatio = canvas.width / canvas.height;
	var renderableHeight, renderableWidth, xStart, yStart;

	// If image's aspect ratio is less than canvas's we fit on height
	// and place the image centrally along width
	if (imageAspectRatio < canvasAspectRatio) {
		renderableHeight = canvas.height;
		renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	}

	// If image's aspect ratio is greater than canvas's we fit on width
	// and place the image centrally along height
	else if (imageAspectRatio > canvasAspectRatio) {
		renderableWidth = canvas.width
		renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
		xStart = 0;
		yStart = (canvas.height - renderableHeight) / 2;
	}

	// Happy path - keep aspect ratio
	else {
		renderableHeight = canvas.height;
		renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;
	}
	model.context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};

function resizeCanvas() {
	var widthElem = document.getElementById('widthInput');
	var heightElem = document.getElementById('heightInput');
	var width = widthElem.value;
	var height = heightElem.value;

	// model.width = width;
	// model.height = height;
	model.canvas.width = width;
	model.canvas.height = height;

	csImage.src = 'http://www.biobest.co.uk/assets/images/home/blood-samples-web.jpg';
}