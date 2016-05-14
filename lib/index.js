var canvas = document.getElementById('chart');
var chartContext = canvas.getContext('2d');

var Chart = require('./chart');
var chart = new Chart (chartContext, canvas);

requestAnimationFrame(function chartLoop() {
  if (chart.completed === true) {
    setTimeout ( function () { alert('done'); }, 100);
  } else if (chart.open === true) {
    // DON'T REDRAW BOARD WHILE OPEN
  } else {
    requestAnimationFrame(chartLoop);
  }
});
