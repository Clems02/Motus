import React, { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import Square from './Square';
import { utils } from '../service/utils';

const SquareLine = ({ letters, currentRow }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {letters.map(({ value, status }, index) => (
        <Square
          key={index}
          value={value}
          variant={currentRow ? 'CURRENT' : status}
        />
      ))}
    </Box>
  );
};

export default SquareLine;
