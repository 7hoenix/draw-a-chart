const chai = require('chai');
const assert = chai.assert;

var Game = require('../lib/game');
var Board = require('../lib/board');
var Loader = require('../lib/loader');
var King = require('../lib/pieces/king');
var Queen = require('../lib/pieces/queen');
var Rook = require('../lib/pieces/rook');
var Bishop = require('../lib/pieces/bishop');
var Pawn = require('../lib/pieces/pawn');

describe('Game', function () {
  beforeEach( function () {
    this.board = new Board ();
    this.loader = new Loader (this.board);
    this.game = new Game (this.board);
    this.board.game = this.game;
    this.loader.createSquares();
    this.board.squares = this.loader.squares;
    this.blackKingsSquare = this.board.findSquare(7, 7);
    this.blackKing = new King (this.blackKingsSquare, "black");
    this.blackKingsSquare.piece = this.blackKing;
    this.whiteKingsSquare = this.board.findSquare(1, 1);
    this.whiteKing = new King (this.whiteKingsSquare, "white");
    this.whiteKingsSquare.piece = this.whiteKing;
  });

  it('should instantiate a new game', function () {
    assert.isObject(this.game);
  });

  it('should start out as whites turn', function () {
    assert.equal(this.game.turn, "white");
  });

  it('should be able to toggle turns', function () {
    this.game.toggleTurn();

    assert.equal(this.game.turn, "black");
  });

  it('should know if the king is in check', function () {
    let squareTwo = this.board.findSquare (4, 6);
    let squareThree = this.board.findSquare (5, 5);
    let bishop = new Bishop (squareTwo, "white");
    squareTwo.piece = bishop;

    bishop.move(squareThree);

    assert.equal(this.game.inCheck(), true);
  });

  it('should know if it has available moves', function () {
    assert.equal(this.game.availableMoves().length, 8);
  });

  it('should know total available moves for several pieces', function () {
    let squareTwo = this.board.findSquare (4, 6);
    let bishop = new Bishop (squareTwo, "white");
    squareTwo.piece = bishop;
    let squareThree = this.board.findSquare (2, 5);
    let pawn = new Pawn (squareThree, "white");
    squareThree.piece = pawn;
    pawn.moveCount = 1;

    assert.equal(this.game.availableMoves().length, 18);
  });

  it('should know when it is in check mate', function () {
    let squareTwo = this.board.findSquare (0, 6);
    let squareThree = this.board.findSquare (6, 0);
    let queen = new Queen (squareTwo, "white");
    squareTwo.piece = queen;
    let rook = new Rook (squareThree, "white");
    squareThree.piece = rook;

    let squareFour = this.board.findSquare (6, 6);

    queen.move(squareFour);

    assert(this.game.checkMate());
  });

  it('should know when it is a stale mate', function () {
    this.whiteKing.moveCount = 2;
    this.blackKing.moveCount = 2;
    let squareTwo = this.board.findSquare (0, 6);
    let squareThree = this.board.findSquare (6, 0);
    let queen = new Queen (squareTwo, "white");
    squareTwo.piece = queen;
    let rook = new Rook (squareThree, "white");
    squareThree.piece = rook;

    let squareFour = this.board.findSquare (6, 6);

    rook.move(squareFour);

    assert(this.game.staleMate());
  });
});
