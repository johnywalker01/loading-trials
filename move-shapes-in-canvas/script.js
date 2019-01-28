var canvas, ctx, BB, offsetX, offsetY, WIDTH, HEIGHT, dragok, startX, startY, resizeOk;
var dotRadius = 3;
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
		x: 200,
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

	// listen for mouse events
	canvas.onmousedown = myDown;
	canvas.onmouseup = myUp;
	canvas.onmousemove = myMove;

	// call to draw the scene
	draw();
}


// draw a single rect
function rect(shape) {
	if (shape.width < 5) {
		shape.width = 5;
	}
	if (shape.height < 5) {
		shape.height = 5;
	}
	ctx.strokeStyle = shape.stroke;
	ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
	drawDots(shape);
}

// draw a single rect
function circle(shape) {
	ctx.strokeStyle = shape.stroke;
	ctx.beginPath();
	ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2);
	ctx.closePath();
	ctx.stroke();
}

// draw a single ellipse
function ellipse(shape) {
	if (shape.width < 5) {
		shape.width = 5;
	}
	if (shape.height < 5) {
		shape.height = 5;
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
	drawDots(shape);
}

// clear the canvas
function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// draw Resize dot inside ellipse
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

// draw dots on rect points
function drawDots(shape) {
	let dot = {
		x: shape.x,
		y: shape.y,
		r: dotRadius,
		fill: "#f7660c",
		isDragging: false,
		isResizing: false
	}
	ctx.fillStyle = dot.fill;
	// ctx.beginPath();
	// ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
	// ctx.closePath();
	// ctx.fill();

	// ctx.beginPath();
	// ctx.arc(dot.x + rectPoints.width, dot.y, dot.r, 0, Math.PI * 2);
	// ctx.closePath();
	// ctx.fill();

	// ctx.beginPath();
	// ctx.arc(dot.x, dot.y + rectPoints.height, dot.r, 0, Math.PI * 2);
	// ctx.closePath();
	// ctx.fill();

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
		// decide if the shape is a rect or circle
		// (it's a rect if it has a width property)
		if (shapes[i].width && shapes[i].type == "rectangle") {
			rect(shapes[i]);
		} else if (shapes[i].width && shapes[i].type == "ellipse") {
			ellipse(shapes[i]);
		} else {
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
		if ((s.width && s.type == "rectangle") || (s.width && s.type == "ellipse")) {
			// test if the mouse is on the corners of this rect
			if (isOnRectCorner(mx, my, s)) {
				// if yes, set that rects isResizing=true
				resizeOk = true;
				s.isResizing = true;
				break;
			}
			// test if the mouse is inside this rect
			// else if (mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height) {
			else if (s.type == 'rectangle' && insideRectangle(mx, my, s)) {
				// if yes, set that rects isDragging=true
				dragok = true;
				s.isDragging = true;
				break;
			} else if (s.type == 'ellipse' && insideEllipse(mx, my, s)) {
				// if yes, set that rects isDragging=true
				dragok = true;
				s.isDragging = true;
				break;
			}
		}
		// test if the mouse is on the corners of this circle
		else {
			var dx = s.x - mx;
			var dy = s.y - my;
			// // test if the mouse is on the corners of this ellipse
			// if (isOnEllipseCorner(mx, my, s)) {
			// 	// if yes, set that rects isResizing=true
			// 	resizeOk = true;
			// 	s.isResizing = true;
			// }
			// test if the mouse is inside this circle
			/* else */
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

function insideRectangle(mx, my, s) {
	let inside = false;
	const pf = 6;
	// console.log(mx + '\t' +s.x)
	/* This condition is checking whether the pointer is inside the shape; rectangle */
	// if (mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height)

	/* This condition is checking whether the pointer is on the edges of the shape; rectangle */
	if (mx > s.x - pf && mx < s.x + s.width + pf && my > s.y - pf && my < s.y + s.height + pf) {
		if (mx > s.x + pf && mx < s.x + s.width - pf && my > s.y + pf && my < s.y + s.height - pf) {} else {
			inside = true;
		}
	}

	return inside;
}

function insideEllipse(mx, my, s) {
	let inside = false;

	var cx = s.x + s.width / 2;
	var cy = s.y + s.height / 2;
	var r = dotRadius;
	var dx = cx - mx;
	var dy = cy - my;
	// console.log('dx ' + (dx * dx) + ' dy- ' + (dy * dy) + ' rad - ' + (r * r))
	if (dx * dx + dy * dy <= r * r) {
		inside = true;
	}

	return inside;
}

function isOnRectCorner(mx, my, s) {
	let resizePointX = s.x + s.width;
	let resizePointY = s.y + s.height;
	let onCorner = false;
	// console.log(mx + ' == ' + resizePointX + ' && ' + my + ' == ' + resizePointY);
	if (mx == resizePointX || (mx > (resizePointX - dotRadius) && mx < (resizePointX + dotRadius))) {
		// console.log("--> INSIDE X POINTS <--");
		if (my == resizePointY || (my > (resizePointY - dotRadius) && my < (resizePointY + dotRadius))) {
			// console.log("--> INSIDE Y POINTS <--");
			onCorner = true;
		}
	}
	// console.log("onCorner " + onCorner);
	return onCorner;
}

function isOnEllipseCorner(mx, my, shape) {
	let onCorner = false;

	var bb = getArcBounds(shape.x, shape.y, shape.r, 0, Math.PI * 2);
	let resizePointX = bb.x + bb.width;
	let resizePointY = bb.y + bb.height;
	// console.log(mx + ' == ' + resizePointX + ' && ' + my + ' == ' + resizePointY);
	// dx * dx + dy * dy < s.r * s.r
	if (mx == resizePointX || (mx > (resizePointX - dotRadius) && mx < (resizePointX + dotRadius))) {
		// console.log("--> INSIDE ELLIPSE X POINTS <--");
		if (my == resizePointY || (my > (resizePointY - dotRadius) && my < (resizePointY + dotRadius))) {
			// console.log("--> INSIDE ELLIPSE Y POINTS <--");
			onCorner = true;
		}
	}
	// console.log("onCorner " + onCorner);
	return onCorner;
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
		// move each rect that isDragging 
		// by the distance the mouse has moved
		// since the last mousemove
		for (var i = 0; i < shapes.length; i++) {
			var s = shapes[i];
			if (s.isDragging) {
				s.x += dx;
				s.y += dy;
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
					s.width = s.width + dx;
					s.height = s.height + dy;
				}
			}
		}
	}
	if (dragok || resizeOk) {
		// redraw the scene with the new rect positions
		draw();

		// reset the starting mouse position for the next mousemove
		startX = mx;
		startY = my;
	}
}

// function getArcBounds(cx, cy, radius, startAngle, endAngle) {
// 	var minX = 1000000;
// 	var minY = 1000000;
// 	var maxX = -1000000;
// 	var maxY = -1000000;

// 	var possibleBoundingPoints = []
// 	// centerpoint
// 	possibleBoundingPoints.push({
// 		x: cx,
// 		y: cy
// 	});
// 	// starting angle
// 	possibleBoundingPoints.push(arcpoint(cx, cy, radius, startAngle));
// 	// ending angle
// 	possibleBoundingPoints.push(arcpoint(cx, cy, radius, endAngle));
// 	// 0 radians
// 	if (0 >= startAngle && 0 <= endAngle) {
// 		possibleBoundingPoints.push(arcpoint(cx, cy, radius, 0));
// 	}
// 	// PI/2 radians
// 	var angle = Math.PI / 2;
// 	if (angle >= startAngle && angle <= endAngle) {
// 		possibleBoundingPoints.push(arcpoint(cx, cy, radius, angle));
// 	}
// 	// PI radians
// 	var angle = Math.PI;
// 	if (angle >= startAngle && angle <= endAngle) {
// 		possibleBoundingPoints.push(arcpoint(cx, cy, radius, angle));
// 	}
// 	// PI*3/2 radians
// 	var angle = Math.PI * 3 / 2;
// 	if (angle >= startAngle && angle <= endAngle) {
// 		possibleBoundingPoints.push(arcpoint(cx, cy, radius, angle));
// 	}

// 	for (var i = 0; i < possibleBoundingPoints.length; i++) {
// 		var pt = possibleBoundingPoints[i];
// 		if (pt.x < minX) {
// 			minX = pt.x;
// 		}
// 		if (pt.y < minY) {
// 			minY = pt.y;
// 		}
// 		if (pt.x > maxX) {
// 			maxX = pt.x;
// 		}
// 		if (pt.y > maxY) {
// 			maxY = pt.y;
// 		}
// 	}

// 	return ({
// 		x: minX,
// 		y: minY,
// 		width: maxX - minX,
// 		height: maxY - minY
// 	});

// }

// function arcpoint(cx, cy, radius, angle) {
// 	var x = cx + radius * Math.cos(angle);
// 	var y = cy + radius * Math.sin(angle);
// 	return ({
// 		x: x,
// 		y: y
// 	});
// }