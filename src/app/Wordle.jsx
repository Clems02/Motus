import { Box, Button, Paper, Typography } from '@mui/material';
import KeyBoard from '../composants/KeyBoard';
import TryBoard from '../composants/TryBoard';
import React, { useEffect, useState } from 'react';
import { utils } from '../service/utils';
import DialogResult from '../composants/DialogResult';
import DialogParams from '../composants/DialogParams';
import { data } from '../service/data';
import { useTheme } from '@emotion/react';

const Wordle = () => {
  const theme = useTheme();
  const [gameStatus, setGameStatus] = useState('');
  const [openParams, setOpenParams] = useState(false);

  const [rows, setRows] = useState(6);
  const [wordLengthOK, setWordLengthOK] = useState([5]); //Stock la longueur possible du mots tiré au hasard

  const [currentRow, setCurrentRow] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [tryWords, setTryWords] = useState([]);
  const [keyBoard, setKeyBoard] = useState([]);

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

    const keyBoardRow = [];
    for (let x = 0; x < data.keyBoard.length; x++) {
      const array = [];
      for (let y = 0; y < data.keyBoard[x].length; y++) {
        array.push({ value: data.keyBoard[x][y], status: 'UNKNOWN' });
      }
      keyBoardRow.push(array);
    }
    setKeyBoard(keyBoardRow);

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
      setTimeout(() => {
        setGameStatus('WIN');
      }, 2000);
    }

    if (!win) {
      if (currentRow === rows - 1) {
        setTimeout(() => {
          setGameStatus('LOSED');
        }, 2000);
      }
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ bgcolor: 'white' }}>{targetWord}</Box>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingY: 4,
          maxWidth: '600px',
          width: '100%',
          margin: '10px auto',
          textAlign: 'center',
          borderRadius: '30px',
          border: `6px solid ${theme.palette.primary.main}`,
        }}
      >
        <Typography
          variant='h5'
          sx={{ textDecoration: 'underline 5px' }}
          flexWrap={'wrap'}
        >
          Wordle Clemsouille
        </Typography>
      </Paper>
      <TryBoard tryWords={tryWords} currentRow={currentRow} />
      <KeyBoard
        gameStatus={gameStatus}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onKeyDown={handleKeyDown}
        tryWords={tryWords}
        keyBoard={keyBoard}
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
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px auto',
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          borderRadius: '30px',
          border: `6px solid ${theme.palette.primary.main}`,
          gap: 2,
        }}
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
      </Paper>
    </Box>
  );
};

export default Wordle;
