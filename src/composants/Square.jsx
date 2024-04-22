import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const Square = ({ letter }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: `3px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        margin: '3px',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>{letter.toUpperCase()}</Typography>
    </Box>
  );
};

export default Square;
