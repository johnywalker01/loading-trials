function fileChangeEvent(fileInput) {

    if (fileInput.target.files && fileInput.target.files[0]) {
        // removing child elements from parent node
        var elem = document.getElementById("drawingPane");
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
        console.log("removed elements; if any");

        var reader = new FileReader();

        reader.onload = () => {
            if (fileInput.target.id == "baseFile") {
                this.baseValueChanged(reader.result);
            }
        };

        //Read the text file
        reader.readAsText(fileInput.target.files[0]);
    }
}

function baseValueChanged(fileData) {
    var e = document.getElementById("drawingPane");

    var cCode = document.createElement("code");
    cCode.appendChild(document.createTextNode(fileData));

    var cPre = document.createElement("pre");
    cPre.appendChild(cCode);

    e.appendChild(cPre);

    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
    console.log("highlighted");
}
