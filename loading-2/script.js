var timers = [];
var dots = [];

function startOnload() {
    // This changes everything
    "use strict";

    let someFunc = function () {
        // retrieve the element
        var dot1 = document.getElementById("dot1");
        dots.push(dot1);
        var dot2 = document.getElementById("dot2");
        dots.push(dot2);
        var dot3 = document.getElementById("dot3");
        dots.push(dot3);
        var dot4 = document.getElementById("dot4");
        dots.push(dot4);
        var dot5 = document.getElementById("dot5");
        dots.push(dot5);
        for (var i = 0; i < dots.length; i++) {
            // console.log("in 00 "+i);
            // -> removing the class
            dots[i].classList.remove("dot-anim" + (i+1));

            // -> triggering reflow /* The actual magic */
            // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
            // This was, from the original tutorial, will no work in strict mode. Thanks Felis Phasma! The next uncommented line is the fix.
            // element.offsetWidth = element.offsetWidth;

            void dots[i].offsetWidth;

            // -> and re-adding the class
            dots[i].classList.add("dot-anim" + (i+1));
            // console.log("out 00 "+i);
        }
        dots.forEach(dot => {

        });
    }

    // add a timer to the array
    timers.push(setInterval(someFunc, 1440));

}

function onUnload() {
    // clear all timers in the array
    for (var i = 0; i < timers.length; i++) {
        clearInterval(timers[i]);
    }
}
