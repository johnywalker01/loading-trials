var canvas, ctx, BB, offsetX, offsetY, WIDTH, HEIGHT, dragok, startX, startY, resizeOk;
var dotRadius = 3;
var minSize=5;
var shapes = [];
const kappa = 0.5522848;

function onBodyLoad() {
	// get canvas related references
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	BB = canvas.getBoundingClientRect();
	offsetX = BB.left;
	offsetY = BB.top;
	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	// drag related variables
	dragok = false;
	startX;
	startY;
	resizeOk = false;

	// an array of objects that define different shapes
	shapes = [];
	// define 2 rectangles
	shapes.push({
		x: 10,
		y: 50,
		width: 70,
		height: 60,
		type: "rectangle",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});
	shapes.push({
		x: 50,
		y: 90,
		width: 70,
		height: 70,
		type: "rectangle",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});
	// define 2 circles
	shapes.push({
		x: 210,
		y: 100,
		r: 30,
		type: "circle",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});
	shapes.push({
		x: 210,
		y: 100,
		r: 40,
		type: "circle",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});
	// define 2 ellipses
	shapes.push({
		x: 180,
		y: 150,
		width: 90,
		height: 60,
		type: "ellipse",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});
	shapes.push({
		x: 210,
		y: 260,
		width: 70,
		height: 90,
		type: "ellipse",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});

	// define 3 lines
	shapes.push({
		x1: 40,
		y1: 180,
		x2: 70,
		y2: 220,
		type: "line",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});
	shapes.push({
		x1: 150,
		y1: 95,
		x2: 150,
		y2: 425,
		type: "line",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});
	shapes.push({
		x1: 150,
		y1: 200.5,
		x2: 300,
		y2: 200.5,
		type: "line",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});
	shapes.push({
		x1: 220,
		y1: 300.5,
		x2: 350,
		y2: 300.5,
		type: "line",
		stroke: "#0d5ddd",
		isDragging: false,
		isResizing: false
	});

	// listen for mouse events
	canvas.onmousedown = myDown;
	canvas.onmouseup = myUp;
	canvas.onmousemove = myMove;

	// call to draw the scene
	draw();
}


// draw a single rectangle
function rectangle(shape) {
	if (shape.width < minSize) {
		shape.width = minSize;
	}
	if (shape.height < minSize) {
		shape.height = minSize;
	}
	ctx.strokeStyle = shape.stroke;
	ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);

	drawCenterPoint(shape);
	drawResizeDot(shape);
}

// draw a single rect
function circle(shape) {
	ctx.strokeStyle = shape.stroke;
	ctx.beginPath();
	ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2);
	ctx.closePath();
	ctx.stroke();
}

// draw a single rect
function line(shape) {
	ctx.strokeStyle = shape.stroke;
	ctx.beginPath();
	ctx.moveTo(shape.x1, shape.y1);
	ctx.lineTo(shape.x2, shape.y2);
	ctx.stroke();

	drawLineDots(shape);
}

// draw a single ellipse
function ellipse(shape) {
	if (shape.width < minSize) {
		shape.width = minSize;
	}
	if (shape.height < minSize) {
		shape.height = minSize;
	}

	let x = shape.x;
	let y = shape.y;
	let w = shape.width;
	let h = shape.height;

	let ox = (w / 2) * kappa; // control point offset horizontal
	let oy = (h / 2) * kappa; // control point offset vertical
	let xe = x + w; // x-end
	let ye = y + h; // y-end
	let xm = x + w / 2; // x-middle
	let ym = y + h / 2; // y-middle

	ctx.strokeStyle = shape.stroke;
	ctx.beginPath();
	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	ctx.stroke();

	drawCenterPoint(shape);
	drawResizeDot(shape);
}

// clear the canvas
function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

/**
 * draw a stroke dot in the center of the shape; typically used for translating rectangle or ellipse.
 * @param {*} shape 
 */
function drawCenterPoint(shape) {
	dx = shape.x + shape.width / 2;
	dy = shape.y + shape.height / 2;
	// console.log(dx + '\t' + dy);
	let dot = {
		x: dx,
		y: dy,
		r: dotRadius,
		stroke: "#f7660c",
		isDragging: false,
		isResizing: false
	}
	ctx.strokeStyle = dot.stroke;
	ctx.beginPath();
	ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
	ctx.closePath();
	ctx.stroke();
}

/**
 * draw 2 dots on line; one for resizing and other for translating.
 * @param {*} shape 
 */
function drawLineDots(shape) {
	let dot1 = {
		x: shape.x1,
		y: shape.y1,
		r: dotRadius,
		stroke: "#f7660c",
		isDragging: false,
		isResizing: false
	}
	let dot2 = {
		x: shape.x2,
		y: shape.y2,
		r: dotRadius,
		fill: "#f7660c",
		isDragging: false,
		isResizing: false
	}
	ctx.strokeStyle = dot1.stroke;
	ctx.beginPath();
	ctx.arc(dot1.x, dot1.y, dot1.r, 0, Math.PI * 2);
	ctx.closePath();
	ctx.stroke();

	ctx.fillStyle = dot2.fill;
	ctx.beginPath();
	ctx.arc(dot2.x, dot2.y, dot2.r, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();

}

// 
/**
 * draw a dot on shape's bottom-right corner; which is used later for resizing the shape.
 * @param {*} shape 
 */
function drawResizeDot(shape) {
	let dot = {
		x: shape.x,
		y: shape.y,
		r: dotRadius,
		fill: "#f7660c",
		isDragging: false,
		isResizing: false
	}
	ctx.fillStyle = dot.fill;
	ctx.beginPath();
	ctx.arc(dot.x + shape.width, dot.y + shape.height, dot.r, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
}

// redraw the scene
function draw() {
	clear();
	// redraw each shape in the shapes[] array
	for (var i = 0; i < shapes.length; i++) {
		if (shapes[i].type == "rectangle") {
			rectangle(shapes[i]);
		} else if (shapes[i].type == "ellipse") {
			ellipse(shapes[i]);
		} else if (shapes[i].type == "line") {
			line(shapes[i]);
		} else if (shapes[i].type == "circle") {
			circle(shapes[i]);
		};
	}
}

// handle mousedown events
function myDown(e) {

	// tell the browser we're handling this mouse event
	e.preventDefault();
	e.stopPropagation();

	// get the current mouse position
	var mx = parseInt(e.clientX - offsetX);
	var my = parseInt(e.clientY - offsetY);

	// test each shape to see if mouse is inside
	dragok = false;
	resizeOk = false;
	for (var i = shapes.length - 1; i >= 0; i--) {
		var s = shapes[i];
		// decide if the shape is a rect or circle               
		if ((s.type == "rectangle") || (s.type == "ellipse") || (s.type == 'line')) {
			if (isOnResizePoint(mx, my, s)) { // test if the mouse is inside a a resize point
				resizeOk = true;
				s.isResizing = true;
				break;
			} else if (isOnTranslatePoint(mx, my, s)) { // test if the mouse is inside a a translate point
				dragok = true;
				s.isDragging = true;
				break;
			}
		}
		// test if the mouse is inside a circle
		else {
			var dx = s.x - mx;
			var dy = s.y - my;
			if (dx * dx + dy * dy < s.r * s.r) {
				dragok = true;
				s.isDragging = true;
				break;
			}
		}
	}
	// save the current mouse position
	startX = mx;
	startY = my;
}

/**
 * this method will check whether the mouse is on the translate point of the shape
 * @param {*} mx mouse's x 
 * @param {*} my mouse's y 
 * @param {*} s as shape object
 */
function isOnTranslatePoint(mx, my, s) {
	let inside = false;
	var cx, cy;
	switch (s.type) {
		case 'rectangle':
		case 'ellipse':
			cx = s.x + s.width / 2;
			cy = s.y + s.height / 2;
			break;
		case 'line':
			cx = s.x1;
			cy = s.y1;
			break;

		default:
			break;
	}
	var r = dotRadius;
	var dx = cx - mx;
	var dy = cy - my;
	// console.log('dx ' + (dx * dx) + ' dy- ' + (dy * dy) + ' rad - ' + (r * r))
	if (dx * dx + dy * dy <= r * r) {
		inside = true;
	}

	return inside;
}


/**
 * this method will check whether the mouse is on the resize point of the shape
 * @param {*} mx 
 * @param {*} my 
 * @param {*} s 
 */
function isOnResizePoint(mx, my, s) {
	let inside = false;
	var cx, cy;
	switch (s.type) {
		case 'rectangle':
		case 'ellipse':
			cx = s.x + s.width;
			cy = s.y + s.height;
			break;
		case 'line':
			cx = s.x2;
			cy = s.y2;
			break;

		default:
			break;
	}
	var r = dotRadius;
	var dx = cx - mx;
	var dy = cy - my;
	// console.log('dx ' + (dx * dx) + ' dy- ' + (dy * dy) + ' rad - ' + (r * r))
	if (dx * dx + dy * dy <= r * r) {
		inside = true;
	}

	return inside;
}

// handle mouseup events
function myUp(e) {
	// tell the browser we're handling this mouse event
	e.preventDefault();
	e.stopPropagation();

	// clear all the dragging flags
	dragok = false;
	resizeOk = false;
	for (var i = 0; i < shapes.length; i++) {
		shapes[i].isDragging = false;
		shapes[i].isResizing = false;
	}
}

// handle mouse moves
function myMove(e) {
	// tell the browser we're handling this mouse event
	e.preventDefault();
	e.stopPropagation();

	// get the current mouse position
	var mx = parseInt(e.clientX - offsetX);
	var my = parseInt(e.clientY - offsetY);

	// calculate the distance the mouse has moved
	// since the last mousemove
	var dx = mx - startX;
	var dy = my - startY;

	// if we're dragging anything...
	if (dragok) {
		// move each shape that isDragging 
		// by the distance the mouse has moved
		// since the last mousemove
		for (var i = 0; i < shapes.length; i++) {
			var s = shapes[i];
			if (s.isDragging) {
				if (s.type == 'line') {
					s.x1 += dx;
					s.y1 += dy;
					s.x2 += dx;
					s.y2 += dy;
				} else {
					s.x += dx;
					s.y += dy;
				}
			}
		}

	} else {
		// if we're resizing anything...
		if (resizeOk) {
			// resize each rect that isResizing 
			// by the distance the mouse has moved
			// since the last mousemove
			for (var i = 0; i < shapes.length; i++) {
				var s = shapes[i];
				if (s.isResizing && s.width) {
					s.width += dx;
					s.height += dy;
				} else if (s.isResizing && s.type == 'line') {
					s.x2 += dx;
					s.y2 += dy;
				}
			}
		}
	}
	if (dragok || resizeOk) {
		// redraw the scene with the new shape values
		draw();

		// reset the starting mouse position for the next mousemove
		startX = mx;
		startY = my;
	}
}