function onload() {
    accordionAlgo();
}

function accordionAlgo() {
    // var accItem = document.getElementsByClassName('accordionItem');
    // var accHD = document.getElementsByClassName('accordionItemHeading');
    // for (i = 0; i < accHD.length; i++) {
    //     accHD[i].addEventListener('click', toggleItem, false);
    // }
    // function toggleItem() {
    //     var itemClass = this.parentNode.className;
    //     for (i = 0; i < accItem.length; i++) {
    //         accItem[i].className = 'accordionItem close';
    //     }
    //     if (itemClass == 'accordionItem close') {
    //         this.parentNode.className = 'accordionItem open';
    //     }
    // }
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", toggleItem, false);
    }
    function toggleItem() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }
}
