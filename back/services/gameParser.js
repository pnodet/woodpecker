import {insertOne} from './queries.js';
import {Chess} from '../../modules/cm-chess/Chess.mjs';

const saveGameToDb = (item, username) => {
  const chess = new Chess();
  chess.loadPgn(item);
  let color;
  if (chess.header().White == username) color = 'white';
  if (chess.header().Black == username) color = 'black';

  let game_id = chess.header().Site.split('/')[3];

  let moves = []

  chess.history().forEach(e => {
    moves.push(e.san);
  });
  

  const gameObject = {
    username,
    color,
    game_id,
    moves,
  };
  
  //console.log(chess.history());
  console.log(gameObject);
  
  
  //queries.insertOne(gameObject, 'games');
  //TODO: check that game is not already in the db
};;

export {saveGameToDb};


/*

let color = chess.headers.find(el => el.value === username).name;
  let moves = chess.history();
  console.log(moves);
  let gameObject = {
    game_id: 4, 
    headers: 'test',
    user: username,
    color,
    moves,
  };
  console.log(gameObject)



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
