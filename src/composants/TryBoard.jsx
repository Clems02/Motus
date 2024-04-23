import { Box, Button } from '@mui/material';
import React from 'react';
import SquareLine from './SquareLine';

const TryBoard = ({ tryWords, currentRow }) => {
  return (
    <Box sx={{ margin: '20px' }}>
      {Array.from({ length: tryWords.length }).map((_, index) => (
        <SquareLine
          key={index}
          letters={tryWords[index]}
          currentRow={currentRow === index}
        />
      ))}
    </Box>
  );
};

export default TryBoard;
