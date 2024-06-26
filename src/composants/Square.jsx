import { Box, Typography, styled } from '@mui/material';
import {
  amber,
  blue,
  blueGrey,
  green,
  grey,
  yellow,
} from '@mui/material/colors';

import React from 'react';

const BoxStyled = styled(Box)(({ theme, variant = 'UNKNOWN' }) => ({
  borderRadius: '5px',
  width: '40px',
  height: '40px',
  margin: '6px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  // Appliquer des styles spécifiques à la variante
  ...(variant === 'UNKNOWN' && {
    border: `3px solid ${blueGrey['50']}`,
    outline: `4px solid ${blueGrey['100']}`,
    backgroundColor: blueGrey['100'],
  }),

  ...(variant === 'CURRENT' && {
    border: `3px solid ${blue['100']}`,
    outline: `4px solid ${blue['600']}`,
    backgroundColor: blue['400'],
    transition: '1.5s ease-in-out',
  }),

  ...(variant === 'BON' && {
    border: `3px solid ${green['900']}`,
    outline: `4px solid ${green['700']}`,
    backgroundColor: green['500'],
    transform: 'rotateY(360deg)',
    transition: '1s ease-in-out',
  }),

  ...(variant === 'ABSENT' && {
    border: `3px solid ${grey['A700']}`,
    outline: `4px solid ${grey[600]}`,
    backgroundColor: grey['600'],
    transform: 'rotateY(360deg)',
    transition: '1s ease-in-out',
  }),

  ...(variant === 'INCORRECT' && {
    border: `3px solid ${yellow['400']}`,
    outline: `4px solid ${yellow[700]}`,
    backgroundColor: amber['500'],
    transform: 'rotateY(360deg)',
    transition: '1s ease-in-out',
  }),
}));

const Square = ({ value, onClick, variant }) => {
  return (
    <BoxStyled onClick={onClick} variant={variant}>
      <Typography>{value}</Typography>
    </BoxStyled>
  );
};

export default Square;
