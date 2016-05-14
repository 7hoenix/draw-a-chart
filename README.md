# Chess Trainer

## The Big Feature that's Different:

. Most Chess games work like so:

* You click the piece you want to move.
* The interface lights up with squares your piece can move too.
* You click a square assuming that its a legal move.
* The piece moves to the square you selected.

. This Chess game works backwards.

* Move your cursor over pieces and they will show you squares to move to.
* Then you click on a square you want to move to.
* The interface will then light up all pieces that can move to that square.
* You click a selected piece.
* The piece moves.

## Why do this idea at all?

### Satisficing in Chess is bad

The human brain seems pretty rational and logical, so more often then not we do
this thing called satisficing.

Its a cognitive Bias (a way we as humans systematically lie to ourselves).

It loosely means that although we think we are seeing a ton of options and
choosing the very best option... we tend to just pick the first option that we
believe might get us to our chosen outcome.

It works really well most of the time and enables us to make snap decisions.

But...

## That's a really bad thing in the game of Chess 

Every time you satisfice in Chess you could be losing the game and you never
even know it. You never get to see or improve on your blind spots.

Playing in reverse like this (choosing a square first) will help you improve
your board vision (your ability to see the board at once) because at least once
a game (probably many more than that) you are going to pick a square with a plan
in mind and then realize that you totally didn't see a different line.

Over time this will lead to a much better player as it will drastically increase
your board vision.

## Next steps in development (Bobby Fisher mode)

The way that most people learn to play Chess is generally about the same...

Step 1: Teach the new player how all the pieces move (bishop can go in
diagnals... etc).

Step 2: Teach them how to setup the board.

Step 3: Play hundreds of games.

Step 4: Become good somewhere along the way.

### Bobby Fisher learned how to play in reverse

Bobby Fisher (one of the very best Chess players of all time) learned how to
play completely backwards of this.

Step 1: King and pawn v. King until Bobby could win easily with a single pawn
advantage.

Step 2: Add pieces one at time into the equation (King and two pawns and a
bishop v. King and three pawns and a knight... etc).

Step 3: Get all the way back to the initial setup of the board and be good the 
first time you ever play an actual game.


## Idea for solving checkmate

Note: This was written prior to any real development (and before really knowing 
JavaScript).

Last step:

function checkMate (here) {
  if (inCheck()) {
    [checkMoves(), checkKill(), checkBlock()]
      .all(worker) {
      // Javascript defaults to 0... So if a filter returns a single false entry
      // this stays false.
        if (worker(function filter(here) {
          myPieces.checkMoves(here)
        });
          setcheckMateFlag()
        )
        }
      }
  }
};

# To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run the application.
* `http://localhost:8080/webpack-dev-server/test.html` to run the test suite in the browser.

To build the static files:

```js
npm build
```


To run tests in Node:

```js
npm test
```
