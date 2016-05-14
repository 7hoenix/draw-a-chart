const $ = require("jquery");
var canvas = document.getElementById('chart');
var chartContext = canvas.getContext('2d');


var Chart = require('./chart');
var Analyze = require('./analyze');
var chart = new Chart (chartContext, canvas);
var isLogging = false;
var clicked;
var rendered = false;
var points = []

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

function drawAndStore(x, y) {
		// var message = 'Mouse position: ' + x + ',' + y;
		// console.log(message)

		if(points.length > 1) {
			var prevPoint = points[points.length-1]
			chartContext.beginPath();
			chartContext.moveTo(prevPoint[0], prevPoint[1]);
			chartContext.lineTo(x, y);
			chartContext.stroke();
		}

		//Store the point 
		points.push([x, y]);
		
}

function normalize(data, n) {
	var normalizedData = [];
	for (var i = 0; i < data.length; i++) {
		var iNew = i*n;
		normalizedData.push(data[iNew]);
	}
	return normalizedData
}

function plotPoints() {
	window.getSelection().removeAllRanges();
	$('#highchart').show();
	rendered = true;
	$("#chart").hide();
	// var spacing = 10;
	// var normalizedInput = normalize(points, spacing);

	var yValues = points.map(function(point) {
		return 400-point[1];
	});

	chartOptions.series[0].data = [];
	chartOptions.series[0].data = yValues;
	var highchart = new Highcharts.Chart(chartOptions)

}

$("#chart").mousedown(function() {
	isLogging = true;
	clicked = true;
	canvas.addEventListener('mousemove', function(evt) {
		if(isLogging) {
			var mousePos = getMousePos(canvas, evt);
		    drawAndStore(mousePos.x, mousePos.y);
		}
 	}, false);
});

$("#chart").mouseup(function() {
	isLogging = false;
	console.log(points.length)
	var message = Analyze(points)
	appendMessage(message)
	plotPoints()
});

$("#chart").mouseleave(function() {
	if(clicked && !rendered) {
		isLogging = false;
		var message = Analyze(points);
		appendMessage(message)
		plotPoints()
	}
	
});

$("#clearButton").click(function() {
	clearGraph();
});


function appendMessage(message) {

	var htmlString = '<div class="alert alert-success">' +
                      '<button data-dismiss="alert" class="close close-sm" type="button">' +
                       '<i class="fa fa-times"></i>'+
                       '</button>' + message +
                        '</div>'

    $("#noti-box").append(htmlString);
    $(".chartRow").after('<button class="btn btn-success" id="answerButton"> Show me the answer </button>');    
    $("#answerButton").click(function() {
		showCorrect();
	});         
}

function logFunc(x) {
	var a = 83/7;
	var b  = 30;
	return a*Math.log(x) + b
}

function showCorrect() {
	console.log('Test')
	var xVals = []
	for (var i = 0; i < points.length; i++) {
		xVals.push(i)
	}

	var yVals = xVals.map(function(x) {
		return logFunc(x) 
	});

	console.log(yVals)
}

function clearGraph() {
	$('#highchart').empty()
	$('#highchart').hide()
	$('#chart').show()
	chartContext.clearRect(0, 0, canvas.width, canvas.height);
	points = []
}	

var chartOptions = {
		chart: {
            renderTo: 'highchart',
            type: 'line',
            animation: true
        },
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
          title: {
                  text: 'Time'
              },
          labels: {
          enabled: false }
           
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'User',
            data: []
        }]
    };

   
