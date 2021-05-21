import {insertOne} from './queries.js';
import {Chess} from '../../modules/cm-chess/Chess.mjs';

const saveGameToDb = item => {
  const chess = new Chess();
  chess.loadPgn(item);
  let gameObject = {
    headers: chess.header(),
    moves: chess.history()
  }
  insertOne(gameObject, 'games');
};

export {saveGameToDb};


/*

How the object should look like :

json = {
    'game_id': game_id,
    'fen': parent.board().fen(),
    'ply': parent.ply(),
    'moves': [puzzle.node.uci()] + list(map(lambda m : m.uci(), puzzle.moves)),
    'cp': puzzle.cp,
    'generator_version': self.version,
}

*/
