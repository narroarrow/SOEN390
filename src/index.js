import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


const theme = createTheme(
{
  palette: {
    type: 'light',
    primary: {
      main: '#115e2a',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: 'rgba(250,255,207,0.32)',
      paper: '#e2e4ef',
    },
    text: {
      primary: 'rgba(55,53,53,0.87)',
    },
  },
  typography: {
    h4: {
      fontSize: '3rem',
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
reportWebVitals();
