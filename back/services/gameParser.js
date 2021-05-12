import {insertOne} from './queries.js';
import {Chess} from '../../modules/cm-chess/Chess.mjs';

const saveGameToDb = item => {
  const chess = new Chess();
  chess.loadPgn(item);
  return chess;
};

export {saveGameToDb};


/*

        json = {
            'game_id': game_id,
            'fen': parent.board().fen(),
            'ply': parent.ply(),
            'moves': [puzzle.node.uci()] + list(map(lambda m : m.uci(), puzzle.moves)),
            'cp': puzzle.cp,
            'generator_version': self.version,
        }



    def is_seen(self, id: str) -> bool:
        if not self.url:
            return False
        try:
            status = http.get(self._seen_url(id), timeout = TIMEOUT).status_code
            return status == 200
        except Exception as e:
            self.logger.error(e)
            return False

    def set_seen(self, game: Game) -> None:
        try:
            if self.url:
                http.post(self._seen_url(game.headers.get("Site", "?")[20:]), timeout = TIMEOUT)
        except Exception as e:
            self.logger.error(e)

    def is_seen_pos(self, node: ChildNode) -> bool:
        if not self.url:
            return False
        id = urllib.parse.quote(f"{node.parent.board().fen()}:{node.uci()}")
        try:
            status = http.get(self._seen_url(id), timeout = TIMEOUT).status_code
            return status == 200
        except Exception as e:
            self.logger.error(e)
            return False

    def _seen_url(self, id: str) -> str:
        return "{}/seen?token={}&id={}".format(self.url, self.token, id)

    def post(self, game_id: str, puzzle: Puzzle) -> None:
        parent = puzzle.node.parent
        assert parent

        if not self.url:
            print(json)
            return None
        try:
            r = http.post("{}/puzzle?token={}".format(self.url, self.token), json=json)
            self.logger.info(r.text if r.ok else "FAILURE {}".format(r.text))
        except Exception as e:
            self.logger.error("Couldn't post puzzle: {}".format(e))

            */
