const pgnParser = require('pgn-parser');
const fs = require('fs').promises;

const {Chess} = require('chess.js');

async function getOpening(color) {
  const pgn = await fs.readFile(`games/${color}.pgn`, 'utf8');
  return pgnParser.parse(pgn);
}

doesNodeHasVar = node => {
  if (node.ravs === undefined) {
    return {status: false};
  } else if (node.ravs !== undefined) {
    return {status: true, variations: node.ravs};
  }
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

loopThrough = (arr, chess, color) => {
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
  const chess = new Chess();
  const color = 'White';
  const [openingRef] = await getOpening(color);
  fs.writeFile(`games/${color}.js`, 'let LIST_POSITIONS = {');
  await loopThrough(openingRef.moves, chess, color);
  fs.appendFile(`games/${color}.js`, '}');
}

main();
