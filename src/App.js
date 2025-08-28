import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './Login';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainPage from './Pages/MainPage'; // Example
import ChatPage from './Pages/ChatPage'; // Example
import Processes from './Pages/Processes';
import Process from './Pages/Process';
import InvoiceDetail from './Pages/InvoiceDetail';

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
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}> 
          <Route path="/main" element={<MainPage />} />
          <Route path="/processes" element={<Processes />} />
          <Route path="/processes/:processId?" element={<Process />} />
          <Route path="/processes/:processId?/invoice/:invoiceId?" element={<InvoiceDetail />} />
          <Route path="/main/:chatId?" element={<MainPage />} />
          <Route path="/chat/:chatId?" element={<ChatPage />} />
        </Route>
      </Routes>

    </ThemeProvider>
  );
}
export default App;
