import fetch from 'node-fetch';
import ndjson from 'ndjson';
import {Transform, Stream, Writable, pipeline} from 'stream';
import * as fs from 'fs';
import * as queries from '../services/queries.js';
import {Chess} from 'chess.js';
import {saveGameToDb} from '../services/gameParser.js';

import {Router} from 'express';
const router = Router();

router.get('/users', (req, res) => {});

router.get('/games', async function (req, res) {
  const username = req.query.username;
  const max = req.query.max;
  const token = req.query.token;
  const url = 'https://lichess.org/api/games/user/' + username + '?max=' + max + '&token=' + token + '&rated=true&perfType=blitz,rapid,classical&pgnInJson=true';
  
  const response = await fetch(url, {headers: {Accept: 'application/x-ndjson'}})
  response.body
    .pipe(ndjson.parse())
    .on('data', function (item) {
      //FIXME: doesn't work yet
      const isInDB = queries.findOne({game_id: item.id}, 'games');
      console.log(isInDB);
      if (!isInDB) {
        let color;
        if (item.players.white.user.name == username) color = 'white';
        if (item.players.black.user.name == username) color = 'black';

        const gameObject = {
          game_id: item.id,
          user: username,
          color,
          pgn: item.pgn,
        };
        queries.insertOne(gameObject, 'games');
      } else {
        console.log('Game :' + item.id + ' is in db')
      }
    })
    .on('pause', () => { console.log('pause'); })
    .on('end', () => {
      console.log('end');
      res.send({status: 200});
    })
    .on('error', err => { console.log(err); });
    
});

router.get('/', (req, res) => {
  const result = queries.createDB();
  result === true ? res.send({status: 200}) : res.send({status: 500});
});

export default router;
