/*
1. connect to lichess
-> oauth lichess

2. server generates problems from your games (close to your chess level)
-> POST woodpecker/vilouza
-> GET lichess/games/vilouza

curl  https://lichess.org/api/games/user/vilouza\?perfType\=$perf\&rated\=true\&analysed\=true\&clocks=false\&evals\=true

-> lichess puzzler
-> generator
-> validator

3. train between 20 and 100 pb
-> get duplicate puzzles
-> play puzzle at your level

4. get a score

5. train again 

6. add more puzzles from your games to the pool

7. compare to studyopenings to see where you went wrong
-> import multiple PGN
-> compare PGN to avoid transposition or different moves

const lichess = require('lichess-api');

lichess.user.games('brumoche', {with_moves: 1}, function (err, games) {
  console.log('hello')
  console.log(games);
});

https://chess.stackexchange.com/questions/4138/chess-engine-with-api


      let candidateMoves = openingRef.moves[index].ravs.filter(function (e) {
        return e.moves.filter(function (a) {
          return a.move_number == currentMove && a.move == userMove;
        });
      });


function isInDB(lastGame, openingRef, index, chess, colorToPlay) {
  const opponentMove = lastGame.moves[index].move;
  let databaseMove = openingRef.moves[index].move;

  if (opponentMove == databaseMove) {
    return {status: true, opponentMove, databaseMove};
  } else {
    colorToPlay == 'White'
      ? (currentMove = lastGame.moves[index].move_number)
      : (currentMove = lastGame.moves[index - 1].move_number);

    let variations = openingRef.moves[index].ravs;
    //console.log(variations[0]);
    let candidateMoves = [];
    for (let j = 0; j < variations.length; j++) {
      const elem = variations[j].moves;
      //console.log(elem[0]);
      if (elem[0].move == opponentMove) {
        candidateMoves.push(elem);
      }
    }
    if (candidateMoves.length > 0)
      return {status: true, candidateMoves, opponentMove, databaseMove};
    return {status: false, opponentMove, databaseMove};
  }
}


if (!currentNode.move_number) {
              if (colorToPlay != 'White') {
                currentMove = lastGame.moves[index - 1].move_number;
                nodeMoveNumber =
                  openingRef.moves[i].ravs[j].moves[k - 1].move_number;

                console.log(
                  openingRef.moves[i].ravs[j].moves[k - 1]
                );
                console.log(
                  openingRef.moves[i].ravs[j].moves[k]
                );
                console.log(
                  currentNode.move + ' ' + opponentMove + ' ' + nodeMoveNumber
                );
              }
            }
*/

const fetch = require('node-fetch');
const pgnParser = require('pgn-parser');
const fs = require('fs').promises;

const {Chess} = require('chess.js');
const chess = new Chess();

//const deserializeOpeningTree = require('./openingtree/OpeningTreeSerializer')

async function getUser(username) {
  let url = `https://lichess.org/api/user/${username}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}

function getUserColor(username, data) {
  return data.headers.find(el => el.value === username).name;
}

async function getOpening(color) {
  const pgn = await fs.readFile(`games/${color}.pgn`, 'utf8');
  return pgnParser.parse(pgn);
}

function whichColorToPlay(data) {
  data.move_number ? (color = 'White') : (color = 'Black');
  return color;
}

function whichTurnNumber(lastNode, currentNode, colorToPlay) {
  if (colorToPlay == 'White') {
    return currentNode.move_number;
  } else if (colorToPlay == 'Black') {
    return lastNode.move_number;
  }
}

function isTheory(lastGame, openingRef, index, chess) {
  const userMove = lastGame.moves[index].move;
  const theoryMove = openingRef.moves[index].move;
  if (userMove == theoryMove) {
    return {status: true, userMove, theoryMove};
  } else {
    return {status: false, userMove, theoryMove};
  }
}

/*

Pour chaque coup

il faut regarder si c'est le bon coup
si oui il faut regarder si il est joué par le bon camp
si oui il faut regarder si la position correspond

sinon il faut regarder si le coup a des variations

si oui on recommence

sinon on passe au coup suivant

*/

function testMoveArray(arr, opponentMove, colorToPlay, turn) {
  let variations = [];
  for (let i = 0; i < arr.length; i++) {
    const currentNode = arr[i];

    if (colorToPlay == 'White') {
      if (currentNode.move_number != undefined) {
        if (currentNode.move == opponentMove) {
          console.log(currentNode.move_number + ' ' + currentNode.move);
          if (colorToPlay == 'Black' && arr[i].move_number == turn) {
            return {status: true, databaseMove: currentNode};
          }
        } else if (currentNode.ravs !== undefined) {
          variations.push(currentNode.ravs);
        }
      }
    } else if (colorToPlay == 'Black') {
      if (currentNode.move_number == undefined) {
        if (currentNode.move == opponentMove) {
          console.log(arr[i - 1].move_number + ' ' + currentNode.move);

          if (colorToPlay == 'Black' && arr[i - 1].move_number == turn) {
            return {status: true, databaseMove: currentNode};
          }
        } else if (currentNode.ravs !== undefined) {
          variations.push(currentNode.ravs);
        }
      }
    }
  }
  return {status: false, variations};
}

function isInDB(lastGame, openingRef, index, chess, colorToPlay) {
  const opponentMove = lastGame.moves[index].move;
  let databaseMove = openingRef.moves[index].move;

  if (opponentMove == databaseMove) {
    return {status: true, databaseMove};
  } else {
    console.log('Looking for ' + opponentMove);

    let turn = whichTurnNumber(
      lastGame.moves[index - 1],
      lastGame.moves[index],
      colorToPlay
    );

    let result = testMoveArray(
      openingRef.moves,
      opponentMove,
      colorToPlay,
      turn
    );

    if (result.status == true) {
      return {status: true, databaseMove: result.databaseMove};
    } else if (result.variations.length > 0) {
      for (let i = 0; i < result.variations.length; i++) {
        for (let j = 0; j < result.variations[i].length; j++) {
          let subResult = testMoveArray(
            result.variations[i][j].moves,
            opponentMove,
            colorToPlay,
            turn
          );
          if (subResult.status == true) {
            return {status: true, databaseMove: result.databaseMove};
          }
        }
      }
    }
    return {status: false, opponentMove, databaseMove};
  }
}

async function getGames(username) {
  let url = `https://lichess.org/api/games/user/${username}\?max\=1`;
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const arrBuffer = new Uint8Array(buffer);
  let data = new TextDecoder().decode(arrBuffer);

  const [lastGame] = pgnParser.parse(data);

  let playerColor = getUserColor(username, lastGame);
  playerColor = lastGame.headers.find(el => el.value === username).name;
  const [openingRef] = await getOpening(playerColor);

  for (let index = 0; index < lastGame.moves.length; index++) {
    const colorToPlay = whichColorToPlay(lastGame.moves[index]);

    if (colorToPlay == playerColor) {
      const result = isTheory(lastGame, openingRef, index, chess);
      if (result.status == true) chess.move(result.userMove);
      console.log(colorToPlay + ' played ' + result.userMove);
    } else {
      console.log(colorToPlay + ' played ' + lastGame.moves[index].move);
      const result = isInDB(lastGame, openingRef, index, chess, colorToPlay);
      result.status == true
        ? chess.move(lastGame.moves[index].move)
        : console.log('move is not in the database');
      if (result.status == false) {
        console.log(chess.ascii());
        break;
      }
      //if (result.candidateMoves) console.log(result.candidateMoves);
    }
  }
}

getGames('detnop');
