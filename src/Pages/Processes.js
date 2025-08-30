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
import { ProcessAPI } from "../lib/api";

function Processes() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("themeMode") === "dark";
    }
    return false;
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [processes, setProcesses] = useState([]);

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
    // sessionStorage.removeItem("themeMode");
    sessionStorage.removeItem("access_token");

    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddProcess = async (processName, declarationType) => {
    const newProcess = {
      process_name: processName,
      declaration_type: declarationType,
    };

    let response = await ProcessAPI.create(newProcess);
    if (response) {
      setProcesses([...processes, response]);
    }
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

            {processes.length === 0 ? (
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                Checking for processes...
              </Typography>
            ) : 
            <ProcessTable
              theme={theme}
              processes={processes}
              onDeleteProcess={handleDeleteProcess}
            />
          }
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Processes;