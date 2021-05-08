import fetch from 'node-fetch';
import {promises as fs} from 'fs';
import {Chess} from '../modules/cm-chess/Chess.mjs';

import {getOpening} from './openingParser.js';
import * as func from './functions.js';

console.log(await func.getUserData('vilouza'));

let chess = await getOpening('White');

func.getGames('detnop');

generatePositions = pgn => {
  let games = pgn.split('\n\n');
  let positions = [];
  for (let game of games) {
    let tempChess = new Chess();
    if (tempChess.load_pgn(game)) {
      let history = tempChess.history();
      if (history) {
        let chess = new Chess();
        for (let move of history) {
          chess.move(move);
          let fen = chess.fen().split(' ')[0] + ' w KQkq - 0 1';
          positions.push(fen);
        }
      }
    }
  }
};
