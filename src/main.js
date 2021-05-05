import fetch from 'node-fetch';
import {promises as fs} from 'fs';
import {Chess} from '../modules/cm-chess/Chess.mjs';

import {getOpening} from './openingParser.js';
import * as func from './functions.js';

console.log(await func.getUserData('vilouza'));

let chess = await getOpening('White');

func.getGames('detnop')
