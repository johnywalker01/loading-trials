var dragged = false;
var endingX = 0;
var endingY = 0;
var startingX = 0;
var startingY = 0;
var initialXvalue = 0;
var initialYvalue = 0;

var canvas = document.getElementById("canvas");
var element = document.getElementById("draggable");

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.getElementById("canvas").addEventListener("dragstart", dragHandler, false);
document.getElementById("canvas").addEventListener("drag", dragHandler, false);
document.getElementById("canvas").addEventListener("dragend", dragHandler, false);


function dragHandler(e) {
  e.dataTransfer.setData("Text", e.target.id);
  e = e || window.event;
  console.log("e.type " + e.type);
	
  var parentLeft = canvas.offsetLeft, parentTop = canvas.offsetTop;
  var dragX = e.clientX-parentLeft, dragY = e.clientY-parentTop;
  // console.log("X: " + dragX + " Y: " + dragY);
  if (e.type == "dragstart") {
    dragged = true;
    startingX = dragX;
    startingY = dragY;
    initialXvalue = startingX;
    initialYvalue = startingY;

    var crt = this.cloneNode(true);
    crt.style.backgroundColor = "red";
    crt.style.display = "none"; /* or visibility: hidden, or any of the above */
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);

  } else if (e.type == "drag") {
    onDrag(dragX, dragY);
  } else if (e.type == "dragend") {
    dragged = false;
    console.log("You removed your finger from the screen!");
    canvas.style.cursor = "default";
  }
}

function onDrag(drawX, drawY) {
  endingX = drawX;
  endingY = drawY;

  upateSquarePoints(drawX,drawY);
}
function upateSquarePoints(xValue,yValue) {
  if (dragged) {
    if (xValue > initialXvalue && yValue < initialYvalue) {
			/* // System.out.println("GOING 12-3"); */
			startingX = initialXvalue;
			startingY = yValue;

			endingX = xValue;
			endingY = initialYvalue;
		}
		else if (xValue > initialXvalue && yValue > initialYvalue) {
			/* // System.out.println("GOING 3-6"); */
			endingX = xValue;
			endingY = yValue;
		}
		else if (xValue < initialXvalue && yValue > initialYvalue) {
			/* // System.out.println("GOING 6-9"); */
			startingX = xValue;
			startingY = initialYvalue;

			endingX = initialXvalue;
			endingY = yValue;
		}
		else if (xValue < initialXvalue && yValue < initialYvalue) {
			/* // System.out.println("GOING 9-12"); */
			startingX = xValue;
			startingY = yValue;

      endingX = initialXvalue;
      endingY = initialYvalue;
    }

    var strWidth = (endingX - startingX).toString();
    var strHeight = (endingY - startingY).toString();
    // console.log(strWidth + " ! " + strHeight);
    var recWidth = parseInt(strWidth.replace("-", ""));
    var recHeight = parseInt(strHeight.replace("-", ""));

    if (recWidth >= 0 && recHeight >= 0) {
      // element.className = 'drawSelection';
      element.style.display = 'block';
      element.style.left = startingX + 'px';
      element.style.top = startingY + 'px';
      element.style.width = recWidth + 'px';
      element.style.height = recHeight + 'px';
      element.style.background = 'rgba(201, 76, 76, 0.7)';
    }
  }
}