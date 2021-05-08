import {readFile} from 'fs/promises';
import {Chess} from '../modules/cm-chess/Chess.mjs';

async function getOpening(color) {
  const pgn = await readFile(`./games/${color}.pgn`, 'utf8');
  const chess = new Chess();
  chess.loadPgn(pgn);
  return chess;
}

export {getOpening}
