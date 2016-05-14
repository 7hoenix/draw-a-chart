const $ = require("jquery");

function Game (board) {
  this.board = board;
  this.turn = "white";
  this.over = false;
}

Game.prototype.toggleTurn = function () {
  if (this.turn === "white") {
    this.turn = "black";
  } else if (this.turn === "black") {
    this.turn = "white";
  }
  this.board.clearThisJustMoved();
  this.updateStatsBoard();
};

Game.prototype.updateStatsBoard = function () {
  if (this.checkMate()) {
    this.over = true;
    $('#game-status').html('<h2>CHECKMATE! ' + this.turn.toUpperCase() + ' LOSES!</h2>');
  } else if (this.staleMate()) {
    $('#game-status').html('<h2>STALEMEATE... EVERYONE LOSES!</h2>');
  } else if (this.inCheck()) {
    $('#game-status').html('<h2>' + this.turn.toUpperCase() + ' KING IS IN CHECK!</h2>');
  } else {
    $('#game-status').html('<h2>Random words of encouragement</h2>');
  }
  $('#player-turn').html('<h2>' + this.turn.toUpperCase() + ' PLAYER</h2>');
};

Game.prototype.checkMate = function () {
  return this.availableMoves().length === 0 && this.inCheck();
};

Game.prototype.staleMate = function () {
  return this.availableMoves().length === 0 && !this.inCheck();
};

Game.prototype.inCheck = function () {
  var kingsSquare = this.board.currentKingSquare();
  var attackingPieces = this.board.opponentCanMoveHere(kingsSquare);
  return attackingPieces.length > 0;
};

Game.prototype.availableMoves = function () {
  var moves = [];
  this.board.squares.forEach (function (square) {
    moves = moves.concat(square.legalPieces());
  });
  return moves;
};

module.exports = Game;
