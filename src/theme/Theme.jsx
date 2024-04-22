import {
  ThemeProvider,
  colors,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import React, { useContext } from 'react';

const Theme = ({ children }) => {
  let theme = createTheme({
    typography: {
      fontFamily: 'Cartoon, sans-serif',
    },
    palette: {
      primary: {
        main: colors.lightBlue['800'],
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
