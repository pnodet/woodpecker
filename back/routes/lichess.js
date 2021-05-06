import { Router } from 'express';
const router = Router();

router.get('/users', (req, res) => {

});

router.get('/games', (req, res) => {
  const username = req.query.username
  const max = req.query.max
  const token = req.query.token
  const url = 'https://lichess.org/api/games/user/' + username + '?max=' + max + '&token=' + token + '&rated=true&perfType=blitz,rapid,classical';
  //const url = `https://lichess.org/api/games/user/${username}\?max\=${max}\&token\=${token}\&rated\=true\&perfType\=blitz,rapid,classical`;
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const arrBuffer = new Uint8Array(buffer);
  let data = new TextDecoder().decode(arrBuffer);
  fs.writeFile('./test.pgn', data);
  //TODO: save to games to mongo db
  res.send({ status: 200 })
});

export default router;
