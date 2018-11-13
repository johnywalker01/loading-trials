function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  var elem = ev.target;
  var theCSSprop = window.getComputedStyle(elem, null).getPropertyValue("background-color");
  // console.log("elem - " + elem);
  // console.log("theCSSprop - " + theCSSprop);
  ev.dataTransfer.setData("text", theCSSprop);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log("colorCode is " + data)
  ev.target.style.backgroundColor = data;

}