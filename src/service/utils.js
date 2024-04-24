import { data } from './data';

const isLetter = (letter) => {
  return letter.length === 1 && letter.match(/[a-z]/i);
};

const randomWord = (lengthPossible) => {
  const words = data.words;

  const possibleWords = words.filter((word) =>
    lengthPossible.includes(word.length)
  );

  const word = possibleWords[Math.trunc(Math.random() * possibleWords.length)];
  return word.toUpperCase();
};

const minMaxLengthWord = () => {
  const longueurUnique = data.words.reduce((acc, word) => {
    const longueur = word.length;
    if (!acc.includes(longueur)) {
      acc.push(longueur);
    }
    return acc;
  }, []);

  return longueurUnique.sort((a, b) => a - b);
};

export const utils = {
  isLetter,
  randomWord,
  minMaxLengthWord,
};
