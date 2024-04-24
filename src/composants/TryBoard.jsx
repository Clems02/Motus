import { Box, Button, Paper } from '@mui/material';
import React from 'react';
import SquareLine from './SquareLine';
import { useTheme } from '@emotion/react';

const TryBoard = ({ tryWords, currentRow }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        padding: '20px',
        margin: '10px auto',
        borderRadius: '30px',
        border: `6px solid ${theme.palette.primary.main}`,
      }}
    >
      {Array.from({ length: tryWords.length }).map((_, index) => (
        <SquareLine
          key={index}
          letters={tryWords[index]}
          currentRow={currentRow === index}
        />
      ))}
    </Paper>
  );
};

export default TryBoard;
