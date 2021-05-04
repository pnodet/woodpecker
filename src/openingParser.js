import {promises as fs} from 'fs';
import {Chess} from './cm-chess/Chess.mjs';

//const deserializeOpeningTree = require('./openingtree/OpeningTreeSerializer')

async function getOpening(color) {
  const pgn = await fs.readFile(`games/${color}.pgn`, 'utf8');
  const chess = new Chess();
  chess.loadPgn(pgn);
  return chess;
}

export {getOpening}


/*
const doesNodeHasVar = node => {
  let result;
  if (node.variation === undefined) {
    return {status: false};
  } else if (node.variation !== undefined) {
    result = {status: true, variation: node.variation};
  } else if (node.variations !== undefined) {
    result = {status: true, variations: node.variations};
  }
  return result;
};

nodeToFen = (node, chess, color, nextNode) => {
  console.log(node.move);
  chess.move(node.move);
  console.log(chess.ascii());

  if (nextNode !== undefined && nextNode.move !== undefined) {
    const text =
      '\n"' + chess.fen().toString() + '" : "' + nextNode.move + '",';
    fs.appendFile(`games/${color}.js`, text);
  }
};

loopThrough = (arr, color) => {
  for (let i = 0; i < arr.length; i++) {
    const node = arr[i];
    const nextNode = arr[i + 1];
    nodeToFen(node, chess, color, nextNode);

    const hasVar = doesNodeHasVar(node);
    if (hasVar.status == true) {
      for (let j = 0; j < hasVar.variations.length; j++) {
        loopThrough(hasVar.variations[j].moves, chess, color);
      }
    }
  }
};

async function main() {
  const color = 'White';
  // const [openingRef] = await getOpening(color);
  const chess = await getOpening(color);
  fs.writeFile(`games/${color}.js`, 'let LIST_POSITIONS = {');
  await loopThrough(chess, color);
  fs.appendFile(`games/${color}.js`, '}');
}

main();


*/
