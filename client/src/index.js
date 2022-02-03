import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme(
{
  palette: {
    type: 'light',
    primary: {
      main: '#26495c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a84417',
    },
    background: {
      default: '#f7f9fc',
      paper: '#fafafa',
    },
    error: {
      main: '#ff1000',
    },
  },
  typography: {
    h1: {
      letterSpacing: '0em',
      lineHeight: 1.2,
    },
    h2: {
      letterSpacing: '0em',
    },
    button: {
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
}
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
