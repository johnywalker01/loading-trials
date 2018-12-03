var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};
var pieChartConfig = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                window.chartColors.red,
                window.chartColors.orange,
                window.chartColors.yellow,
                window.chartColors.green,
                window.chartColors.blue,
            ],
            label: 'Dataset 1'
        }],
        labels: [
            'Red',
            'Orange',
            'Yellow',
            'Green',
            'Blue'
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Pie Chart'
        }
    }
};

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var color = Chart.helpers.color;
var barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
        borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }, {
        label: 'Dataset 2',
        backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
        borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }]

};

var barChartConfig = {
    type: 'bar',
    data: barChartData,
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart'
        }
    }
};

var stackedBarChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: window.chartColors.red,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }, {
        label: 'Dataset 2',
        backgroundColor: window.chartColors.blue,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }, {
        label: 'Dataset 3',
        backgroundColor: window.chartColors.green,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }]

};

var stackedBarChartConfig={
    type: 'bar',
    data: stackedBarChartData,
    options: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
        },
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
};


function triggerChartInit(chartType) {
    var ctx;
    if (chartType == "pie") {
        ctx = document.getElementById('chart-area-pie').getContext('2d');
        window.myPie = new Chart(ctx, pieChartConfig);
    } else if (chartType == "bar") {
        ctx = document.getElementById('chart-area-bar').getContext('2d');
        window.myBar = new Chart(ctx, barChartConfig);
    } else if (chartType == "stackedBar") {
        ctx = document.getElementById('chart-area-stackedBar').getContext('2d');
        window.myStackedBar = new Chart(ctx, stackedBarChartConfig);

    }
};

// document.getElementById('randomizeData').addEventListener('click', function () {

//     if (typeof (Storage) !== "undefined") {
//         // Code for localStorage/sessionStorage.
//         if (sessionStorage.chartType) {
//             console.log("sessionStorage.chartType "+sessionStorage.chartType);
//             if (sessionStorage.chartType == "pie") {
//                 pieChartConfig.data.datasets.forEach(function (dataset) {
//                     dataset.data = dataset.data.map(function () {
//                         return randomScalingFactor();
//                     });
//                 });

//                 window.myPie.update();
//             } else if (sessionStorage.chartType == "bar") {
//                 var zero = Math.random() < 0.2 ? true : false;
//                 barChartData.datasets.forEach(function (dataset) {
//                     dataset.data = dataset.data.map(function () {
//                         return zero ? 0.0 : randomScalingFactor();
//                     });

//                 });
//                 window.myBar.update();
//             } else if (sessionStorage.chartType == "stackedBar") {
//                 stackedBarChartData.datasets.forEach(function(dataset) {
//                     dataset.data = dataset.data.map(function() {
//                         return randomScalingFactor();
//                     });
//                 });
//                 window.myStackedBar.update();
//             }

//         } else {

//         }
//     } else {
//         // Sorry! No Web Storage support..
//         console.error("Sorry! No Web Storage support..");
//     }

// });

// var colorNames = Object.keys(window.chartColors);
// document.getElementById('addDataset').addEventListener('click', function() {
//     var newDataset = {
//         backgroundColor: [],
//         data: [],
//         label: 'New dataset ' + config.data.datasets.length,
//     };

//     for (var index = 0; index < config.data.labels.length; ++index) {
//         newDataset.data.push(randomScalingFactor());

//         var colorName = colorNames[index % colorNames.length];
//         var newColor = window.chartColors[colorName];
//         newDataset.backgroundColor.push(newColor);
//     }

//     config.data.datasets.push(newDataset);
//     window.myPie.update();
// });

// document.getElementById('removeDataset').addEventListener('click', function() {
//     config.data.datasets.splice(0, 1);
//     window.myPie.update();
// });


/** BAR CHART CONFIGURATIONS */

// var colorNames = Object.keys(window.chartColors);
// document.getElementById('addDataset').addEventListener('click', function() {
// 	var colorName = colorNames[barChartData.datasets.length % colorNames.length];
// 	var dsColor = window.chartColors[colorName];
// 	var newDataset = {
// 		label: 'Dataset ' + (barChartData.datasets.length + 1),
// 		backgroundColor: color(dsColor).alpha(0.5).rgbString(),
// 		borderColor: dsColor,
// 		borderWidth: 1,
// 		data: []
// 	};

// 	for (var index = 0; index < barChartData.labels.length; ++index) {
// 		newDataset.data.push(randomScalingFactor());
// 	}

// 	barChartData.datasets.push(newDataset);
// 	window.myBar.update();
// });

// document.getElementById('addData').addEventListener('click', function() {
// 	if (barChartData.datasets.length > 0) {
// 		var month = MONTHS[barChartData.labels.length % MONTHS.length];
// 		barChartData.labels.push(month);

// 		for (var index = 0; index < barChartData.datasets.length; ++index) {
// 			// window.myBar.addData(randomScalingFactor(), index);
// 			barChartData.datasets[index].data.push(randomScalingFactor());
// 		}

// 		window.myBar.update();
// 	}
// });

// document.getElementById('removeDataset').addEventListener('click', function() {
// 	barChartData.datasets.pop();
// 	window.myBar.update();
// });

// document.getElementById('removeData').addEventListener('click', function() {
// 	barChartData.labels.splice(-1, 1); // remove the label first

// 	barChartData.datasets.forEach(function(dataset) {
// 		dataset.data.pop();
// 	});

// 	window.myBar.update();
// });