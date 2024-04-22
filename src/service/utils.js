const isLetter = (letter) => {
  return letter.length === 1 && letter.match(/[a-z]/i);
};

export const utils = {
  isLetter,
};
