function diffUsingJS(viewType) {
    "use strict";
    var byId = function (id) {
            return document.getElementById(id);
        },
        base = difflib.stringAsLines(byId("baseText").value),
        newtxt = difflib.stringAsLines(byId("newText").value),
        sm = new difflib.SequenceMatcher(base, newtxt),
        opcodes = sm.get_opcodes(),
        diffoutputdiv = byId("diffoutput"),
        contextSize = byId("contextSize").value;

    diffoutputdiv.innerHTML = "";
    contextSize = contextSize || null;

    diffoutputdiv.appendChild(diffview.buildView({
        baseTextLines: base,
        newTextLines: newtxt,
        opcodes: opcodes,
        baseTextName: "Base Text",
        newTextName: "New Text",
        contextSize: contextSize,
        viewType: viewType
    }));
}

function fileChangeEvent(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
        var reader = new FileReader();

        reader.onload = () => {
            if (fileInput.target.id == "baseFile") {
                this.baseValueChanged(reader.result);
            } else {
                this.newValueChanged(reader.result);
            }
        };

        //Read the text file
        reader.readAsText(fileInput.target.files[0]);
    }
}

function baseValueChanged(fileData) {
    document.getElementById("baseText").value = fileData;
}

function newValueChanged(fileData) {
    document.getElementById("newText").value = fileData;
}

function tryHighlighting() {
    // console.log("clicked highlight");
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
    var elm = document.getElementsByClassName("cCode");
    for (let index = 0; index < elm.length; index++) {
        let element = elm[index];
        element.setAttribute("style", "padding: 0px;background-color:#00000000;");
    }
}

function destroyMigs() {
    // GC executes, if any
}