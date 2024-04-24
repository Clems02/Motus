import { Box, Button, Typography } from '@mui/material';
import KeyBoard from '../composants/KeyBoard';
import TryBoard from '../composants/TryBoard';
import React, { useEffect, useState } from 'react';
import { utils } from '../service/utils';
import DialogResult from '../composants/DialogResult';
import DialogParams from '../composants/DialogParams';

const Wordle = () => {
  const [gameStatus, setGameStatus] = useState('');
  const [openParams, setOpenParams] = useState(false);

  const [rows, setRows] = useState(6);
  const [wordLengthOK, setWordLengthOK] = useState([5]); //Stock la longueur possible du mots tiré au hasard

  const [currentRow, setCurrentRow] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [tryWords, setTryWords] = useState([]);
  //const [keyBestStatus, setKeyBestStatus] = useState([]); //Utilisé pour afficher les couleurs sur le clavier

  /**
   * => Valeur pour variant square <=
   *        UNKNOWN
   *        BON
   *        ABSENT
   *        INCORRECT
   *
   * => Valeur pour gameStatus <=
   *        WIN
   *        LOSED
   *        PLAYING
   */

  useEffect(() => {
    loadNewGame();
  }, [rows, wordLengthOK]);

  const loadNewGame = () => {
    /**Gestion mot à trouver */
    const word = utils.randomWord(wordLengthOK);
    setTargetWord(word.split(''));

    setTryWords(
      Array.from({ length: rows }, () =>
        Array.from({ length: word.length }).fill(
          new Object({ value: '', status: 'UNKNOWN' })
        )
      )
    );

    setCurrentRow(0);
    setGameStatus('PLAYING');
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

    //Modification state pour les couleurs du board / lignes
    const newArray = [...tryWords];
    newArray[currentRow] = word;
    setTryWords(newArray);

    const win = word.every(({ status }) => status === 'BON');
    if (win) {
      setGameStatus('WIN');
      return;
    }

    if (currentRow === rows - 1) {
      setGameStatus('LOSED');
      return;
    }

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
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: 4 }}>
        <Typography variant='h5'>Wordle - Clemsouille</Typography>
      </Box>
      <TryBoard tryWords={tryWords} currentRow={currentRow} />
      <KeyBoard
        gameStatus={gameStatus}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onKeyDown={handleKeyDown}
        tryWords={tryWords}
      />
      <DialogResult
        gameStatus={gameStatus}
        newGame={loadNewGame}
        targetWord={targetWord}
      />
      <DialogParams
        open={openParams}
        setOpen={setOpenParams}
        rows={rows}
        setRows={setRows}
        setWordLengthOK={setWordLengthOK}
        wordLengthOK={wordLengthOK}
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'center', margin: 3, gap: 2 }}
      >
        <Button
          variant='contained'
          onClick={loadNewGame}
          onKeyDown={(event) => event.preventDefault()}
        >
          Recommencer
        </Button>
        <Button
          variant='contained'
          onClick={() => setOpenParams(true)}
          onKeyDown={(event) => event.preventDefault()}
        >
          Paramètres
        </Button>
      </Box>
    </Box>
  );
};

export default Wordle;
