import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'

/* eslint-disable */
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

function sanitize(name: string): string {
  let check = name.toLowerCase();
  for (let trigger of ["cp", "god", "xj"]) {
    if (check.includes(trigger)) {
      return "kevin";
    }
  }
  return name;
}

export const shareStatus = (guesses: string[]) => {
  var shareString = `NotWordle ${solutionIndex} ${guesses.length}/6`;

  let author = getParameterByName("author");
  if (author.length > 0) {
    shareString += `\nauthor: ${sanitize(author)}`
  }

  shareString += `\n\n${generateEmojiGrid(guesses)}`
  navigator.clipboard.writeText(
    shareString
  );
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
