import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './Login';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage'; // Example
import ChatPage from './Pages/ChatPage'; // Example
import Process from './Pages/Process';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode
        ? {
            background: {
              default: '#0d0c1d',
              paper: '#050519',
            },
          }
        : {
            background: {
              default: '#f0f2f5',
              paper: '#ffffff',
            },
          }),
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/process" element={<Process />} />
          <Route path="/main/:chatId?" element={<MainPage />} />
          <Route path="/chat/:chatId?" element={<ChatPage />} />
        </Routes>

    </ThemeProvider>
  );
}
export default App;
