import { data } from './data';

const isLetter = (letter) => {
  return letter.length === 1 && letter.match(/[a-z]/i);
};

const randomWord = () => {
  const word = data.words[Math.trunc(Math.random() * data.words.length)];
  return word.toUpperCase();
};

export const utils = {
  isLetter,
  randomWord,
};
