const $ = require("jquery");
var canvas = document.getElementById('chart');
var chartContext = canvas.getContext('2d');

var Chart = require('./chart');
var chart = new Chart (chartContext, canvas);
var isLogging = false;

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

function drawAndStore(x, y) {
		var message = 'Mouse position: ' + x + ',' + y;
		console.log(message)
		chartContext.fillRect(x, y, 5, 5);
}

$("#chart").mousedown(function() {
	isLogging = true;
	canvas.addEventListener('mousemove', function(evt) {
		if(isLogging) {
			var mousePos = getMousePos(canvas, evt);
		    drawAndStore(mousePos.x, mousePos.y);
		}
 	}, false);
});

$("#chart").mouseup(function() {
	isLogging = false;
});

