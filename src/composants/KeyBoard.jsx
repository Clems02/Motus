import React, { useEffect } from 'react';
import { data } from '../service/data';
import { Box, Container } from '@mui/material';
import Square from './Square';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { utils } from '../service/utils';

const KeyBoard = () => {
  useEffect(() => {
    const keyListener = (e) => {
      const keyPress = e.key;

      if (keyPress === 'Enter') {
      }

      if (keyPress === 'Backspace') {
      }

      if (utils.isLetter(keyPress)) {
      }
    };

    document.addEventListener('keydown', keyListener);

    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  }, []);

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
            <Square key={index} value={letter} />
          ))}
          {index === data.keyBoard.length - 1 && (
            <>
              <Square
                value={
                  <BackspaceIcon sx={{ fontSize: '20px', display: 'flex' }} />
                }
              />
              <Square
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
