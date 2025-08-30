"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
  Tooltip,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../components/Logo";
import Sidebar from "../components/Sidebar";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#4280EF" },
          background: {
            default: "#ffffff",
            paper: "#374151", // Solid background for sidebar in light mode
          },
          text: {
            primary: "#050519",
            secondary: "#666666",
            sidebarPrimary: "#ffffff", // Add sidebar text colors for light mode
            sidebarSecondary: "#D1D5DB",
          },
        }
      : {
          primary: { main: "#4280EF" },
          background: {
            default: "#33363F", // Match ChatPage main content background
            paper: "#050519", // Solid background for sidebar in dark mode
          },
          text: {
            primary: "#ffffff",
            secondary: "#bbbbbb",
            sidebarPrimary: "#ffffff", // Add sidebar text colors for dark mode
            sidebarSecondary: "#bbbbbb",
          },
        }),
  },
});

function MainPage() {
  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("themeMode") === "dark";
    }
    return false;
  });

  const navigate = useNavigate();
  const theme = createTheme(getDesignTokens(darkMode ? "dark" : "light"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = React.useState(false);

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

  // Navigation handlers for sidebar items
  const handleAiChat = () => {
    navigate("/chat");
  };

  const handleChatHistoryClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  // Define chat history data (aligned with ChatPage)
  const chatHistory = [
    {
      id: "romania-weather",
      title: "Romania weather in September",
      date: "2 days ago",
    },
    {
      id: "healthy-recipes",
      title: "Healthy dinner recipes",
      date: "3 days ago",
    },
    {
      id: "low-confidence-test",
      title: "Low Confidence Test",
      date: "just now",
    },
  ];


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <Sidebar
          theme={theme}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onClose={handleDrawerToggle}
          onAiChat={handleAiChat}
          onChatHistoryClick={handleChatHistoryClick}
          chatHistory={chatHistory}
        />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.default,
          }}
        >
          {/* Top Bar with integrated notification */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderBottom: `1px solid ${
                theme.palette.mode === "light" ? "#E5E7EB" : "#4B5563"
              }`,
              height: "64px",
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    mr: 2,
                    display: { md: "none" },
                    color: theme.palette.text.primary,
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Toggle Theme">
                <IconButton
                  onClick={handleThemeToggle}
                  sx={{ color: theme.palette.text.primary }}
                >
                  <Brightness4Icon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton
                  onClick={() => navigate("/")}
                  sx={{ color: theme.palette.text.primary }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Account">
                <IconButton sx={{ color: theme.palette.text.primary }}>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Main Content Area */}
          <Box sx={{ flex: 1, px: { xs: 2, md: 4 }, overflow: "auto" }}>
            {/* Integrated notification banner */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(57, 127, 247, 0.1)",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "12px",
                color: theme.palette.text.secondary,
                fontFamily: "IBM Plex Mono",
              }}
            >
              <SettingsIcon
                sx={{
                  fontSize: "14px",
                  mr: 1,
                  color: theme.palette.text.secondary,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontSize: "12px",
                  color: theme.palette.text.secondary,
                }}
              >
                Tradia AI is currently in pilot phase. For early access,
                contact: hello@tradia.com.au
              </Typography>
              <CloseIcon
                sx={{
                  fontSize: "14px",
                  ml: 1,
                  color: "red",
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minHeight: "200px",
                mb: 6,
                mt: 4,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  mb: 3,
                  fontWeight: "bold",
                  fontFamily: "IBM Plex Mono",
                  letterSpacing: "0px",
                  fontSize: { xs: "28px", sm: "36px", md: "48px" },
                  color: theme.palette.text.primary,
                }}
              >
                Welcome {sessionStorage.getItem("full_name") || "User"}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: "bold",
                  color: "#0d5c94",
                  fontFamily: "IBM Plex Mono",
                  letterSpacing: "-0.5px",
                  fontSize: { xs: "18px", sm: "24px" },
                }}
              >
                We Create import/export customs declarations for you. 
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 4,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Free plan
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    padding: "10px 20px",
                    fontSize: "14px",
                    backgroundColor: "#20438F",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#1a3a7a",
                    },
                  }}
                >
                  Upgrade now
                </Button>
              </Box>

              {/* <Button
                variant="outlined"
                startIcon={<ChatOutlinedIcon />}
                onClick={handleAiChat}
                sx={{
                  textTransform: "none",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  borderColor: theme.palette.text.secondary,
                  color: theme.palette.text.primary,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: "rgba(66, 128, 239, 0.1)",
                  },
                }}
              >
                AI Chat
              </Button> */}
            </Box>

            {/* History Section - Matching the image exactly */}
            <Box sx={{ maxWidth: "800px", mx: "auto" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    color: theme.palette.text.primary,
                  }}
                >
                  Tradia Completes the process under 20 minutes for you
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    width: "2px",
                    backgroundColor:
                      theme.palette.mode === "light" ? "#013459" : "#cedcf0",
                    my: 2,
                  }}
                />
                {[
                  {
                    id: "coding-assistance",
                    title: "Create an Import or Export declaration Process",
                    time: "10 Seconds",
                  },
                  {
                    id: "write-article",
                    title: "Upload invoices, or bill of lading",
                    time: "2 minutes",
                  },
                  {
                    id: "romania-weather",
                    title: "Tradia Extracts and Understands key data",
                    time: "12 minutes",
                  },
                  {
                    id: "create-items",
                    title: "Create list of items to be declared",
                    time: "1 minutes",
                  },
                  {
                    id: "assigns-code",
                    title: "Automatically assigns HS code",
                    time: "1 minutes",
                  },
                ].map((item, index, array) => (
                  <React.Fragment key={item.id}>
                    <Box
                      onClick={() => null}
                      sx={{
                        flex: 1,
                        p: 2,
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "rgba(66, 128, 239, 0.05)",
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          mb: 0.5,
                          color: theme.palette.text.primary,
                          fontFamily: "monospace",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "12px",
                        }}
                      >
                        {item.time}
                      </Typography>
                    </Box>
                    {index < array.length - 1 && (
                      <Box
                        sx={{
                          width: "2px", // Increased width for boldness
                          backgroundColor:
                            theme.palette.mode === "light"
                              ? "#013459"
                              : "#cedcf0", // Darker colors
                          my: 2,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MainPage;
