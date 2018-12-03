function onload() {
    accordionAlgo();
    accordionDisplayMode();
    accordionCreationDate();
}

function accordionAlgo() {
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

function accordionDisplayMode() {
    var dmItem = document.getElementsByClassName('dm-flex-item');
    for (i = 0; i < dmItem.length; i++) {
        dmItem[i].addEventListener('click', toggleDmItem, false);
    }

    function toggleDmItem() {
        if (this.className != 'dm-flex-item modeOn') {
            for (i = 0; i < this.parentNode.children.length; i++) {
                console.log("clazz " + dmItem[i].className);
                if (dmItem[i].className == 'dm-flex-item modeOff') {
                    dmItem[i].className = 'dm-flex-item modeOn';
                } else {
                    dmItem[i].className = 'dm-flex-item modeOff';
                }
            }

        }
    }
}
function accordionCreationDate() {
    let dmItem = document.getElementsByClassName('cd-flex-item');
    for (i = 0; i < dmItem.length; i++) {
        dmItem[i].addEventListener('click', toggleDmItem, false);
    }

    function toggleDmItem() {
        if (this.className != 'cd-flex-item modeOn') {
            for (i = 0; i < this.parentNode.children.length; i++) {
                console.log("clazz " + dmItem[i].className);
                if (dmItem[i].className == 'cd-flex-item modeOff') {
                    dmItem[i].className = 'cd-flex-item modeOn';
                } else {
                    dmItem[i].className = 'cd-flex-item modeOff';
                }
            }

        }
    }
}
function doFacetClear(){
    console.log("Clear");
}