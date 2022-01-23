import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function shuffle(array: string[]) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}


var seed = 1337 ^ 0xDEADBEEF;
var rand = sfc32(0x9E3779B9, 0x243F6A88, 0xB7E15162, seed);
for (var i = 0; i < 15; i++) rand();

function sfc32(a: any, b: any, c: any, d: any) {
  return function() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}

export const makeAllWordsArray = () => {
  console.log("enumerating");
  let ret = [];
  for (const a of ALPHABET) {
    for (const b of ALPHABET) {
      for (const c of ALPHABET) {
        for (const d of ALPHABET) {
          for (const e of ALPHABET) {
            ret.push(a + b + c + d + e);
          }
        }
      }
    }
  }
  console.log("shuffling");
  shuffle(ret);
  console.log("done");
  return ret;
}

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const solutionIndex = parseInt(getParameterByName("seed"), 10);
const allWordsArray = makeAllWordsArray();
export const solution = allWordsArray[solutionIndex];

export const isWinningWord = (word: string) => {
  return solution === word
}

function getParameterByName(name: string, url = window.location.href): string {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) {
    return "";
  }
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

console.log(allWordsArray.indexOf("ROTOR"));
