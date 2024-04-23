import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const Square = ({ value, onClick }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        border: `3px solid ${theme.palette.primary.main}`,
        borderRadius: '5px',
        margin: '2px',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>{value}</Typography>
    </Box>
  );
};

export default Square;
