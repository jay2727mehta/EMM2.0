// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#4B48B1",
    },
    secondary: {
      main: "#d32f2f",
    },
    warning: {
      main: "#feffff",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#4B48B1",
    },
    secondary: {
      main: "#d32f2f",
    },
    warning: {
      main: "#feffff",
    },
  },
});

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
