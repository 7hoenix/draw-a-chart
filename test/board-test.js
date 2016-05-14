const chai = require('chai');
const assert = chai.assert;

var Game = require('../lib/game');
var Board = require('../lib/board');
var Square = require('../lib/square');
var Piece = require('../lib/piece');

describe('Board', function () {
  beforeEach (function () {
    this.board = new Board ('context', 'canvas');
    this.game = new Game (this.board);
    this.board.game = this.game;
  });

  it('should instantiate a new board', function () {
    assert.isObject(this.board);
  });

  it('should know the canvas it is built on', function () {
    assert.equal(this.board.canvas, 'canvas');
  });

  it('should know the context it is built in', function () {
    assert.equal(this.board.context, 'context');
  });

  it('should know when the game is over', function () {
    assert.equal(this.board.gameOver, false);
  });

  it('knows how many pieces are on the board', function () {
    let square = new Square (this.board, 4, 4);
    let piece = new Piece (square, "black");
    square.piece = piece;
    let squareTwo = new Square (this.board, 4, 6);
    let pieceTwo = new Piece (squareTwo, "white");
    squareTwo.piece = pieceTwo;
    this.board.squares.push(square);
    this.board.squares.push(squareTwo);

    assert.equal(this.board.pieceCount(), 2);
  });
});
