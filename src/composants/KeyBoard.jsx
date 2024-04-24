import React, { useEffect, useState } from 'react';
import { data } from '../service/data';
import { Box, Button, Container } from '@mui/material';
import Square from './Square';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { utils } from '../service/utils';

const KeyBoard = ({ onSubmit, onDelete, onKeyDown, tryWords, gameStatus }) => {
  const [keyList, setKeyList] = useState([]);

  useEffect(() => {
    const newkeyList = [];
    for (let x = 0; x < data.keyBoard.length; x++) {
      const array = [];
      for (let y = 0; y < data.keyBoard[x].length; y++) {
        array.push({ value: data.keyBoard[x][y], status: 'UNKNOWN' });
      }
      newkeyList.push(array);
    }
    setTimeout(() => {
      setKeyList(newkeyList);
    }, 1500);
  }, [gameStatus]);

  useEffect(() => {
    if (keyList != 0) {
      const newArray = tryWords
        .reduce((acc, value) => {
          return acc.concat(value);
        }, [])
        .filter(({ value }) => value != '');

      //console.log('array:', newArray);

      const filteredArray = newArray.reduce((acc, letter) => {
        const letterValue = letter.value;
        const letterStatus = letter.status;

        //N'existe pas encore, donc push dans tableau
        if (!acc.some((letter) => letter.value === letterValue)) {
          acc.push(letter);
          return acc;
        }

        //Existe déja dans tableau, donc need vérif status
        if (acc.some((letter) => letter.value === letterValue)) {
          if (letterStatus === 'BON') {
            const index = acc.findIndex(
              (letter) => letter.value === letterValue
            );
            acc.splice(index, 1);
            acc.push(letter);
            return acc;
          }
        }

        return acc;
      }, []);

      const newkeyList = [...keyList];
      for (let x = 0; x < filteredArray.length; x++) {
        const value = filteredArray[x].value;

        for (let y = 0; y < newkeyList.length; y++) {
          const row = newkeyList[y];
          for (let z = 0; z < row.length; z++) {
            const letter = row[z].value;

            if (letter === value) {
              row[z].status = filteredArray[x].status;
            }
          }
        }
      }
      setKeyList(newkeyList);
    }
  }, [tryWords]);

  useEffect(() => {
    const keyListener = (e) => {
      if (gameStatus != 'PLAYING') return;

      const keyPress = e.key.toUpperCase();

      if (keyPress === 'ENTER') {
        onSubmit();
      }

      if (keyPress === 'BACKSPACE') {
        onDelete();
      }

      if (utils.isLetter(keyPress)) {
        onKeyDown(keyPress);
      }
    };

    document.addEventListener('keydown', keyListener);

    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  }, [onKeyDown]);

  const handleKeyClick = (letter) => {
    if (gameStatus === 'PLAYING') onKeyDown(letter);
  };

  return (
    <Box>
      {keyList.map((row, index) => (
        <Container
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {row.map(({ value, status }, index) => (
            <Square
              key={index}
              value={value}
              variant={status}
              onClick={() => handleKeyClick(value)}
            />
          ))}
          {index === data.keyBoard.length - 1 && (
            <>
              <Square
                onClick={onDelete}
                value={
                  <BackspaceIcon sx={{ fontSize: '20px', display: 'flex' }} />
                }
              />
              <Square
                onClick={onSubmit}
                value={
                  <CheckBoxIcon sx={{ fontSize: '20px', display: 'flex' }} />
                }
              />
            </>
          )}
        </Container>
      ))}
    </Box>
  );
};

export default KeyBoard;
