import fetch from 'node-fetch';

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

export {
  getUserData,
  getUserColor,
  whichColorToPlay,
  whichTurnNumber
};
