import { Box, Button } from '@mui/material';
import KeyBoard from '../composants/KeyBoard';
import TryBoard from '../composants/TryBoard';
import React, { useEffect, useState } from 'react';
import { utils } from '../service/utils';

const Wordle = () => {
  const [rows, setRows] = useState(6);
  const [currentRow, setCurrentRow] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [tryWord, setTryWord] = useState([]);

  useEffect(() => {
    loadNewGame();
  }, []);

  const loadNewGame = () => {
    /**Gestion mot à trouver */
    const word = utils.randomWord();
    setTargetWord(word);
    setTryWord(
      Array.from({ length: rows }, () =>
        Array.from({ length: word.length }).fill('')
      )
    );
  };

  const handleSubmit = () => {
    setCurrentRow(currentRow + 1);
    console.log('submit');
  };

  const handleDelete = () => {
    console.log('delete');
  };

  const handleKeyDown = (value) => {
    console.log(currentRow);
    console.log(tryWord);

    const empty = tryWord
      .filter((_, index) => index === currentRow)[0]
      .findIndex((letter) => letter === '');
    if (empty === -1) {
      console.log('Le mot est plein. Il faut valider.');
      return;
    }

    const newArray = [...tryWord];
    newArray[currentRow][empty] = value;
    setTryWord(newArray);
  };

  return (
    <Box>
      <Button variant='contained' onClick={handleSubmit}>
        Row+1
      </Button>
      <Button variant='contained' onClick={() => console.log(tryWord)}>
        TryWord console
      </Button>
      <Box>Mot à trouver: {targetWord}</Box>
      <Box>Longueur du mot: {targetWord.length}</Box>
      <Box>Current Row: {currentRow}</Box>
      <TryBoard length={targetWord.length} rows={rows} tryWord={tryWord} />
      <KeyBoard
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export default Wordle;
