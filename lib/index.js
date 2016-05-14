var canvas = document.getElementById('chart');
var gameContext = canvas.getContext('2d');

// var Game = require('./game');
// var Board = require('./board');
// var board = new Board (gameContext, canvas, options);
// var game = new Game (board);
// board.game = game;
// board.createIcons();
// setTimeout ( function () {
//   board.createNewBoard();
// }, 100);
// setTimeout ( function () {
//   game.updateStatsBoard();
// }, 200);

requestAnimationFrame(function gameLoop() {
  if (game.over === true) {
    board.redrawBoard();
    setTimeout ( function () { alert('games over'); }, 100);
  } else if (board.nextTurn === true) {
    board.nextTurn = false;
    board.redrawBoard();
    setTimeout ( function () { requestAnimationFrame (gameLoop); }, 1000);
  } else {
    requestAnimationFrame(gameLoop);
  }
});
