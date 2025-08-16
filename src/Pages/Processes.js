// ProcessList.js
import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createAppTheme } from "../theme/theme";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ProcessTable from "../components/ProcessTable";
import AddProcessForm from "../components/AddProcessForm";
import { chatHistoryData } from "../data/chatHistory";
import { ProcessAPI } from "../lib/api";

// Mock initial data
const initialProcesses = [
  { process_id: 1, process_name: "Data Processing Pipeline" },
  { process_id: 2, process_name: "User Authentication" },
  { process_id: 3, process_name: "Email Notification Service" },
  { process_id: 4, process_name: "Payment Processing" },
  { process_id: 5, process_name: "Report Generation" },
];

function Processes() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("themeMode") === "dark";
    }
    return false;
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [processes, setProcesses] = useState(initialProcesses);
  const [nextId, setNextId] = useState(6);

  const navigate = useNavigate();
  const theme = createAppTheme(darkMode ? "dark" : "light");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

const fetch_processes = async () => {
    let response = await ProcessAPI.list()
    if(response.total > 0){
    console.log(response)

        setProcesses(response.processes)
    }
    
  }

  useEffect(()=>{
    fetch_processes();
  },[])

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    sessionStorage.setItem("themeMode", newMode ? "dark" : "light");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("themeMode");
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAiChat = () => {
    navigate("/chat");
  };

  const handleChatHistoryClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  const handleAddProcess = (processName) => {
    const newProcess = {
      process_id: nextId,
      process_name: processName,
    };
    setProcesses([...processes, newProcess]);
    setNextId(nextId + 1);
  };

  const handleDeleteProcess = (processId) => {
    setProcesses(processes.filter((process) => process.process_id !== processId));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar
          theme={theme}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onClose={handleDrawerToggle}
          onAiChat={handleAiChat}
          onChatHistoryClick={handleChatHistoryClick}
          chatHistory={chatHistoryData}
        />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <TopBar
            theme={theme}
            isMobile={isMobile}
            onDrawerToggle={handleDrawerToggle}
            onThemeToggle={handleThemeToggle}
            onLogout={handleLogout}
            onNavigate={navigate}
          />

          <Container
            maxWidth="lg"
            sx={{
              flex: 1,
              py: 3,
              overflow: "auto",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
            >
             Import/Export Processes
            </Typography>

            <Box sx={{ mb: 4 }}>
              <AddProcessForm theme={theme} onAddProcess={handleAddProcess} />
            </Box>

            <ProcessTable
              theme={theme}
              processes={processes}
              onDeleteProcess={handleDeleteProcess}
            />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Processes;