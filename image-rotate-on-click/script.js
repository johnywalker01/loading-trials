function onload() {
    // accordionAlgo();
}

// function accordionAlgo() {
//     var acc = document.getElementsByClassName("img-box");
//     var i;

//     for (i = 0; i < acc.length; i++) {
//         acc[i].addEventListener("click", toggleItem, false);
//     }

//     function toggleItem() {
//         var imgChildren = this.children;
//         imgChildren[0].classList.toggle("active");
//     }
// }

function toggleItem(eve) {
    var imgChildren = eve.children;
    imgChildren[0].classList.toggle("active");
}
