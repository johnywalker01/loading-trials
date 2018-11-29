function onload() {
    // accordionAlgo();
    // accordionDisplayMode();
    // accordionCreationDate();
}

function toggleItem(e) {
    var imgChildren = e.children;
    imgChildren[0].classList.toggle("active");

    var panel = e.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
    if (panel.style.marginBottom) {
        panel.style.marginBottom = null;
    } else {
        panel.style.marginBottom = "5px";
    }
}
function toggleListItem(eve) {
    // console.log("match found " + eve.id);
    document.getElementById("selectedListItemName").innerText = eve.innerText;

    if(eve.id == "graph-1"){
        loadCharts("pie");
    }else if(eve.id == "graph-2"){
        loadCharts("bar");
    }else if(eve.id == "graph-3"){
        loadCharts("stackedBar");
    }
}
var chart;
function loadCharts(chartType){
    if(chartType == "pie"){
        chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Desktop Search Engine Market Share - 2016"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: [
                    {y: 79.45, label: "Google"},
                    {y: 7.31, label: "Bing"},
                    {y: 7.06, label: "Baidu"},
                    {y: 4.91, label: "Yahoo"},
                    {y: 1.26, label: "Others"}
                ]
            }]
        });
        chart.render();
    }
    else if(chartType == "bar"){
        chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            
            title:{
                text:"Fortune 500 Companies by Country"
            },
            axisX:{
                interval: 1
            },
            axisY2:{
                interlacedColor: "rgba(1,77,101,.2)",
                gridColor: "rgba(1,77,101,.1)",
                title: "Number of Companies"
            },
            data: [{
                type: "bar",
                name: "companies",
                axisYType: "secondary",
                color: "#014D65",
                dataPoints: [
                    { y: 3, label: "Sweden" },
                    { y: 7, label: "Taiwan" },
                    { y: 5, label: "Russia" },
                    { y: 9, label: "Spain" },
                    { y: 7, label: "Brazil" },
                    { y: 7, label: "India" },
                    { y: 9, label: "Italy" },
                    { y: 8, label: "Australia" },
                    { y: 11, label: "Canada" },
                    { y: 15, label: "South Korea" },
                    { y: 12, label: "Netherlands" },
                    { y: 15, label: "Switzerland" },
                    { y: 25, label: "Britain" },
                    { y: 28, label: "Germany" },
                    { y: 29, label: "France" },
                    { y: 52, label: "Japan" },
                    { y: 103, label: "China" },
                    { y: 134, label: "US" }
                ]
            }]
        });
        chart.render();
    }
    else if(chartType == "stackedBar"){
        chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title:{
                text: "Evening Sales in a Restaurant"
            },
            axisX: {
                valueFormatString: "DDD"
            },
            axisY: {
                prefix: "$"
            },
            toolTip: {
                shared: true
            },
            legend:{
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [{
                type: "stackedBar",
                name: "Meals",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 56 },
                    { x: new Date(2017, 0, 31), y: 45 },
                    { x: new Date(2017, 1, 1), y: 71 },
                    { x: new Date(2017, 1, 2), y: 41 },
                    { x: new Date(2017, 1, 3), y: 60 },
                    { x: new Date(2017, 1, 4), y: 75 },
                    { x: new Date(2017, 1, 5), y: 98 }
                ]
            },
            {
                type: "stackedBar",
                name: "Snacks",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 86 },
                    { x: new Date(2017, 0, 31), y: 95 },
                    { x: new Date(2017, 1, 1), y: 71 },
                    { x: new Date(2017, 1, 2), y: 58 },
                    { x: new Date(2017, 1, 3), y: 60 },
                    { x: new Date(2017, 1, 4), y: 65 },
                    { x: new Date(2017, 1, 5), y: 89 }
                ]
            },
            {
                type: "stackedBar",
                name: "Drinks",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 48 },
                    { x: new Date(2017, 0, 31), y: 45 },
                    { x: new Date(2017, 1, 1), y: 41 },
                    { x: new Date(2017, 1, 2), y: 55 },
                    { x: new Date(2017, 1, 3), y: 80 },
                    { x: new Date(2017, 1, 4), y: 85 },
                    { x: new Date(2017, 1, 5), y: 83 }
                ]
            },
            {
                type: "stackedBar",
                name: "Dessert",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 61 },
                    { x: new Date(2017, 0, 31), y: 55 },
                    { x: new Date(2017, 1, 1), y: 61 },
                    { x: new Date(2017, 1, 2), y: 75 },
                    { x: new Date(2017, 1, 3), y: 80 },
                    { x: new Date(2017, 1, 4), y: 85 },
                    { x: new Date(2017, 1, 5), y: 105 }
                ]
            },
            {
                type: "stackedBar",
                name: "Takeaway",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 52 },
                    { x: new Date(2017, 0, 31), y: 55 },
                    { x: new Date(2017, 1, 1), y: 20 },
                    { x: new Date(2017, 1, 2), y: 35 },
                    { x: new Date(2017, 1, 3), y: 30 },
                    { x: new Date(2017, 1, 4), y: 45 },
                    { x: new Date(2017, 1, 5), y: 25 }
                ]
            }]
        });
        chart.render();
    }
    
}
        function toggleDataSeries(e) {
            if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }


// function accordionAlgo() {
//     var acc = document.getElementsByClassName("accordion");
//     var i;

//     for (i = 0; i < acc.length; i++) {
//         acc[i].addEventListener("click", toggleItem, false);
//     }

//     function toggleItem() {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//             panel.style.maxHeight = null;
//         } else {
//             panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//     }
// }

// function accordionDisplayMode() {
//     var dmItem = document.getElementsByClassName('dm-flex-item');
//     for (i = 0; i < dmItem.length; i++) {
//         dmItem[i].addEventListener('click', toggleDmItem, false);
//     }

//     function toggleDmItem() {
//         if (this.className != 'dm-flex-item modeOn') {
//             for (i = 0; i < this.parentNode.children.length; i++) {
//                 console.log("clazz " + dmItem[i].className);
//                 if (dmItem[i].className == 'dm-flex-item modeOff') {
//                     dmItem[i].className = 'dm-flex-item modeOn';
//                 } else {
//                     dmItem[i].className = 'dm-flex-item modeOff';
//                 }
//             }

//         }
//     }
// }
// function accordionCreationDate() {
//     let dmItem = document.getElementsByClassName('cd-flex-item');
//     for (i = 0; i < dmItem.length; i++) {
//         dmItem[i].addEventListener('click', toggleDmItem, false);
//     }

//     function toggleDmItem() {
//         if (this.className != 'cd-flex-item modeOn') {
//             for (i = 0; i < this.parentNode.children.length; i++) {
//                 console.log("clazz " + dmItem[i].className);
//                 if (dmItem[i].className == 'cd-flex-item modeOff') {
//                     dmItem[i].className = 'cd-flex-item modeOn';
//                 } else {
//                     dmItem[i].className = 'cd-flex-item modeOff';
//                 }
//             }

//         }
//     }
// }
// function doFacetClear(){
//     console.log("Clear");
// }