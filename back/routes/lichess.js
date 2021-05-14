import fetch from 'node-fetch';
import {promises as fs} from 'fs';
import * as queries from '../services/queries.js';
import {saveGameToDb} from '../services/gameParser.js';

import {Router} from 'express';
const router = Router();

router.get('/users', (req, res) => {});

router.get('/games', async function (req, res) {
  const username = req.query.username;
  const max = req.query.max;
  const token = req.query.token;
  const url = 'https://lichess.org/api/games/user/' + username + '?max=' + max
  + '&token=' + token + '&rated=true&perfType=blitz,rapid,classical';
  //FIXME: Read as stream
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const arrBuffer = new Uint8Array(buffer);
  let data = new TextDecoder().decode(arrBuffer);
  fs.writeFile('./modules/puzzler/games.pgn', data);
  data = data.replaceAll(/\n\n\n/g, '\n')
  //TODO: save to games to mongo db
  const arr = data.split(/(?=\[Event)/g);
  /* arr.forEach(item => {
    console.log(saveGameToDb(item));
  }); */
  res.send({status: 200});
});

router.get('/', (req, res) => {
  const result = queries.createDB();
  result === true ? res.send({status: 200}) : res.send({status: 500});
});

export default router;
