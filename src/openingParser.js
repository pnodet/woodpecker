import {promises as fs} from 'fs';
import {Chess} from '../modules/cm-chess/Chess.mjs';

async function getOpening(color) {
  const pgn = await fs.readFile(`./games/${color}.pgn`, 'utf8');
  const chess = new Chess();
  chess.loadPgn(pgn);
  return chess;
}

export {getOpening}
