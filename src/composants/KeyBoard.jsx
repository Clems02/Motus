import React, { useEffect, useState } from 'react';
import { data } from '../service/data';
import { Box, Button, Container } from '@mui/material';
import Square from './Square';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { utils } from '../service/utils';

const KeyBoard = ({ onSubmit, onDelete, onKeyDown, tryWords, gameStatus }) => {
  const [test, setTest] = useState([
    { value: 'G', status: 'INCORRECT' },
    { value: 'T', status: 'BON' },
    { value: 'V', status: 'ABSENT' },
  ]);

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

  const handleTest = () => {
    console.log(tryWords[0]);
    const bool = test.keys('A');
    console.log(bool);
  };

  const generateVariant = (letter) => {
    // if (tryWords.length === 0) return;
    // //const bool = test.some((item) => item.value === letter) && 'BON';
    // const newArray = tryWords
    //   .reduce((acc, value) => {
    //     return acc.concat(value);
    //   })
    //   .filter(({ value }) => value != '');
    // const uniqueObject = newArray.reduce((acc, value) => {
    //   const existObject = acc.find((item) => console.log(item));
    // });
    // console.log(newArray);
  };

  return (
    <Box>
      {data.keyBoard.map((row, index) => (
        <Container
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {row.map((letter, index) => (
            <Square
              key={index}
              value={letter}
              variant={generateVariant()}
              onClick={() => handleKeyClick(letter)}
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
