import React, { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import Square from './Square';
import { utils } from '../service/utils';

const SquareLine = () => {
  const [letters, setLetters] = useState(Array(5).fill(''));

  useEffect(() => {
    const handleKeyPress = (event) => {
      const letter = event.key;
      if (!utils.isLetter(letter)) {
        console.log("Le caractère saisi n'est pas une letter...");
        return;
      }

      const empty = letters.findIndex((letter) => letter === '');
      if (empty === -1) {
        console.log('Le mot est plein. Il faut valider');
        return;
      }

      let oldLetters = [...letters];
      oldLetters[empty] = letter;
      setLetters(oldLetters);
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [letters]);

  return (
    <Box sx={{ display: 'flex' }}>
      {letters.map((letter, index) => (
        <Square key={index} letter={letter} />
      ))}
    </Box>
  );
};

export default SquareLine;
