// function onload() {
//     // accordionAlgo();
//     // accordionDisplayMode();
//     // accordionCreationDate();
// }

// function toggleItem(e) {
//     var imgChildren = e.children;
//     imgChildren[0].classList.toggle("active");

//     var panel = e.nextElementSibling;
//     if (panel.style.maxHeight) {
//         panel.style.maxHeight = null;
//     } else {
//         panel.style.maxHeight = panel.scrollHeight + "px";
//     }
//     if (panel.style.marginBottom) {
//         panel.style.marginBottom = null;
//     } else {
//         panel.style.marginBottom = "5px";
//     }
// }

function startOnload() {
    updateGraphTypeView('graph-1');
}

function toggleListItem(eve) {
    console.log("match found " + eve.id);
    // document.getElementById("selectedListItemName").innerText = eve.innerText;

    updateGraphTypeView(eve.id);
}

function updateGraphTypeView(graphType) {
    var chartType;
    if (graphType == "graph-1") {
        hideCanvas("chart-area-pie", false);
        hideCanvas("chart-area-bar", true);
        hideCanvas("chart-area-stackedBar", true);
        chartType = "pie";
    } else if (graphType == "graph-2") {
        hideCanvas("chart-area-pie", true);
        hideCanvas("chart-area-bar", false);
        hideCanvas("chart-area-stackedBar", true);
        chartType = "bar";
    } else if (graphType == "graph-3") {
        hideCanvas("chart-area-pie", true);
        hideCanvas("chart-area-bar", true);
        hideCanvas("chart-area-stackedBar", false);
        chartType = "stackedBar";
    }
    updateSessionData(chartType);
}

function hideCanvas(canvas, hide) {
    var canvasHolder = document.getElementById(canvas);
    canvasHolder.style.display = (hide) ? "none" : "inline-block";
}

function updateSessionData(chartType) {
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        sessionStorage.chartType = chartType;
        triggerChartInit(chartType);
    } else {
        // Sorry! No Web Storage support..
        console.error("Sorry! No Web Storage support..");
    }
}

function togglePanels(button, displayType) {
    // console.log("Display Type " + displayType);

    var panelReport = document.getElementById("panelReport");
    var panelGraph = document.getElementById("panelGraph");
    if (displayType == "report") {
        panelReport.style.maxHeight = panelReport.scrollHeight + "px";
        panelGraph.style.maxHeight = null;

        // toggling the button styles for tab selection like feature
        button.classList.add("active");
        button.nextElementSibling.classList.remove("active");
    } else if (displayType == "graph") {
        panelGraph.style.maxHeight = panelGraph.scrollHeight + "px";
        panelReport.style.maxHeight = null;

        // toggling the button styles for tab selection like feature
        button.classList.add("active");
        button.previousElementSibling.classList.remove("active");
    }
}
