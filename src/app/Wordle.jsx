import { Box, Button } from '@mui/material';
import KeyBoard from '../composants/KeyBoard';
import TryBoard from '../composants/TryBoard';
import React, { useEffect, useState } from 'react';
import { utils } from '../service/utils';

const Wordle = () => {
  const [rows, setRows] = useState(6);
  const [currentRow, setCurrentRow] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [tryWords, setTryWords] = useState([]);

  /**
   * UNKNOWN
   * BON
   * ABSENT
   * INCORRECT
   */

  useEffect(() => {
    loadNewGame();
  }, []);

  const loadNewGame = () => {
    console.log('nn');
    /**Gestion mot à trouver */
    const word = utils.randomWord();
    setTargetWord(word.split(''));

    setTryWords(
      Array.from({ length: rows }, () =>
        Array.from({ length: word.length }).fill(
          new Object({ value: '', status: 'UNKNOWN' })
        )
      )
    );

    setCurrentRow(0);
  };

  const handleSubmit = () => {
    const word = tryWords[currentRow];

    if (word.some(({ value }) => value === '')) {
      console.log('Manque lettre');
      return;
    }

    for (let x = 0; x < word.length; x++) {
      if (!targetWord.includes(word[x].value)) {
        word[x].status = 'ABSENT';
      }

      if (targetWord.includes(word[x].value)) {
        word[x].status = 'INCORRECT';
      }

      if (word[x].value === targetWord[x]) {
        word[x].status = 'BON';
      }
    }

    const newArray = [...tryWords];
    newArray[currentRow] = word;
    setTryWords(newArray);

    setCurrentRow(currentRow + 1);
  };

  const handleDelete = () => {
    const row = tryWords.filter((_, index) => index === currentRow)[0];
    let reverseIndexToRemove = row
      .slice()
      .reverse()
      .findIndex(({ value }) => value != '');

    if (reverseIndexToRemove === -1) return;

    const indexToRemove = row.length - 1 - reverseIndexToRemove;

    const newArray = [...tryWords];
    newArray[currentRow][indexToRemove].value = '';
    setTryWords(newArray);
  };

  const handleKeyDown = (value) => {
    const empty = tryWords
      .filter((_, index) => index === currentRow)[0]
      .findIndex(({ value }) => value === '');

    if (empty === -1) {
      console.log('Le mot est plein. Il faut valider.');
      return;
    }

    const newArray = [...tryWords];
    const { status } = newArray[currentRow][empty];
    newArray[currentRow][empty] = { value, status };
    setTryWords(newArray);
  };

  return (
    <Box>
      <Button variant='contained' onClick={loadNewGame}>
        Recommencer
      </Button>
      {/* <Box>Mot à trouver: {targetWord}</Box>
      <Box>Longueur du mot: {targetWord.length}</Box>
      <Box>Current Row: {currentRow}</Box> */}
      <TryBoard tryWords={tryWords} currentRow={currentRow} />

      <KeyBoard
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export default Wordle;
