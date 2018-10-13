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

function displayCanvasText(text) {
	chartContext.font = "35px Lucida Grande";
	chartContext.textAlign = "center";
	chartContext.fillText(text, canvas.width/2 - 15, canvas.height/2);
}

displayCanvasText("Draw Here");

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
		return (-0.125)*point[1]+80;
	});



	chartOptions.series[0].data = [];
	chartOptions.series[0].data = yValues;
	var highchart = new Highcharts.Chart(chartOptions)

}

$("#chart").mousedown(function() {
	isLogging = true;
	clicked = true;
	chartContext.clearRect(0, 0, canvas.width, canvas.height);
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
	appendMessage(message, "info")
	plotPoints()
});

$("#chart").mouseleave(function() {
	if(clicked && !rendered) {
		isLogging = false;
		var message = Analyze(points);
		appendMessage(message, "info")
		plotPoints()
	}

});

$("#clearButton").click(function() {
	clearGraph();
});


function appendMessage(message, type) {
	console.log(type)
	var htmlString = '<div class="alert alert-' + type + '">' +
                      '<button data-dismiss="alert" class="close close-sm" type="button">' +
                       '<i class="fa fa-times"></i>'+
                       '</button>' + message +
                        '</div>'

    $("#noti-box").append(htmlString);


    if(type == "info") {
    	$(".chartRow").after('<div class="row"><div class="col-md-8"><button class="btn btn-success" id="answerButton"> Show me the answer </button></div></div>');
    	$("#answerButton").click(function() {
			showCorrect();
		});
    }

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

	var correctSeries = {
		color: '#00FF00',
		name: "Correct",
		data: yVals.slice(1, yVals.length)
	}
	chartOptions.series.push(correctSeries)
	$("#highchart").remove();
	$("#headerTag").append('<div id="highchart"></div>');

	var highchart = new Highcharts.Chart(chartOptions)

	appendMessage("Here's the actual relationship according to data. As GDP increases, life expectancy increases with diminishing returns.", "success");

	// var question = '<div class="panel-body"><div id="questionText">What is the actual relationship?</div>' +
	// '<div class="dropdown">'+
 //  	'<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
 //    'Choose a graph type' +
 //    '<span class="caret"></span>' +
 //  	'</button>' +
 //  	'<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' +
 //    '<li><a href="#">Linear</a></li>' +
 //    '<li><a href="#">Step Function</a></li>' +
 //    '<li><a href="#">Logarithmic</a></li>' +
 //    '<li><a href="#">Periodic</a></li>' +
 //  	'</ul>' +
	// '</div></div>'

	var question = '<div class="panel-body"><div class="btn-group" role="group" aria-label="...">' +
	'<div id="questionText">What is the actual relationship?</div>' +
  	'<button type="button" class="btn btn-default">Linear</button>' +
  	'<button type="button" class="btn btn-default">Step Function</button>' +
  	'<button type="button" class="btn btn-default">Logarithmic</button>' +
  	'<button type="button" class="btn btn-default">Periodic</button>' +
	'</div></div>';

	$('#questions').append(question);
	$('#questions').show()
	$('#answerButton').hide()
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
            text: 'Life Expectancy vs. GDP',
            x: -20 //center
        },
        xAxis: {
          title: {
                  text: 'GDP Per Capita'
              },
          labels: {
          enabled: false }

        },
        yAxis: {
            title: {
                text: 'Life Expectancy (Years)'
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: '#808080'
            }]
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        tooltip: {
            valueSuffix: ' Years'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
        	color: '#0000FF',
            name: 'You',
            data: []
        }]
    };
