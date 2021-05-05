import fetch from 'node-fetch';
import {promises as fs} from 'fs';

async function getUserData(username) {
  let url = `https://lichess.org/api/user/${username}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function getUserColor(username, data) {
  return data.headers.find(el => el.value === username).name;
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

async function getGames(username) {
  let url = `https://lichess.org/api/games/user/${username}\?max\=50`;
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const arrBuffer = new Uint8Array(buffer);
  let data = new TextDecoder().decode(arrBuffer);
  fs.writeFile('./test.pgn', data);
}

export {
  getUserData,
  getUserColor,
  whichColorToPlay,
  whichTurnNumber,
  getGames,
};
