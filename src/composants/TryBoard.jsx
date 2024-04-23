import { Box, Button } from '@mui/material';
import React from 'react';
import SquareLine from './SquareLine';

const TryBoard = ({ length, rows, currentRow, tryWord }) => {
  const x = 10;

  return (
    <Box>
      <Button variant={'contained'} onClick={() => console.log(tryWord)}>
        Test
      </Button>
      {Array.from({ length: rows }).map((_, index) => (
        <SquareLine length={length} key={index}>
          A
        </SquareLine>
      ))}
    </Box>
  );
};

export default TryBoard;
