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

  const Sidebar = ({ children, theme, mobileOpen, onClose }) => {
    if (isMobile) {
      return (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.sidebarPrimary, // Use sidebarPrimary for text
            },
          }}
        >
          <Box sx={{ p: 3, color: theme.palette.text.sidebarPrimary }}>
            {children}
          </Box>
        </Drawer>
      );
    }

    return (
      <Box
        sx={{
          width: 280,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.sidebarPrimary, // Use sidebarPrimary for text
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          p: 3,
          borderRight: `1px solid ${
            theme.palette.mode === "light" ? "#4B5563" : "#4B5563"
          }`,
        }}
      >
        {children}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <Sidebar
          theme={theme}
          mobileOpen={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <Logo />

          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ color: "white" }} />}
            onClick={handleAiChat}
            sx={{
              mb: 1.5,
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "#20438F",
              color: "white",
              borderRadius: "8px",
              py: 1.5,
              justifyContent: "flex-start",
              "&:hover": {
                backgroundColor: "#3366cc",
              },
            }}
          >
            Start new chat
          </Button>

          <List sx={{ px: 0, mt: 1 }}>
            <ListItem
              button
              onClick={handleAiChat}
              sx={{
                px: 1,
                py: 0.5,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.05)"
                      : "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ChatOutlinedIcon
                sx={{
                  mr: 2,
                  color: theme.palette.text.sidebarSecondary,
                  fontSize: "20px",
                }}
              />
              <ListItemText
                primary="AI chat"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: theme.palette.text.sidebarPrimary,
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  },
                }}
              />
            </ListItem>

            <ListItem sx={{ px: 1, py: 0.5 }}>
              <RestoreOutlinedIcon
                sx={{
                  mr: 2,
                  color: theme.palette.text.sidebarSecondary,
                  fontSize: "20px",
                }}
              />
              <ListItemText
                primary="History"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: theme.palette.text.sidebarSecondary,
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  },
                }}
              />
            </ListItem>

            {chatHistory.map((chat, index) => (
              <React.Fragment key={chat.id}>
                <ListItem
                  button
                  onClick={() => handleChatHistoryClick(chat.id)}
                  sx={{
                    pl: 4,
                    py: 0.5,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "rgba(0,0,0,0.05)"
                          : "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={chat.title}
                    secondary={chat.date}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: theme.palette.text.sidebarPrimary,
                        fontSize: "0.875rem",
                      },
                      "& .MuiListItemText-secondary": {
                        color: theme.palette.text.sidebarSecondary,
                        fontSize: "0.75rem",
                      },
                    }}
                  />
                </ListItem>
                {index < chatHistory.length - 1 && (
                  <Box sx={{ borderBottom: "1px solid #4B5563", my: 1 }} />
                )}
              </React.Fragment>
            ))}

            <ListItem
              button
              sx={{
                pl: 4,
                py: 0.5,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.05)"
                      : "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemText
                primary="View all"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: theme.palette.text.sidebarSecondary,
                    fontSize: "0.875rem",
                  },
                }}
              />
            </ListItem>
          </List>

          <Box sx={{ mt: "auto", pt: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                textTransform: "none",
                justifyContent: "space-between",
                borderColor:
                  theme.palette.mode === "light" ? "#4B5563" : "#4B5563",
                color: theme.palette.text.sidebarPrimary,
                "&:hover": {
                  borderColor:
                    theme.palette.mode === "light" ? "#6B7280" : "#6B7280",
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.05)"
                      : "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: "#4280EF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1,
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  A
                </Box>
                Alexandra
              </Box>
            </Button>
          </Box>
        </Sidebar>

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
                Good morning, Alexandra
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
                Ask. Explore. Create. With Tradia AI
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

              <Button
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
              </Button>
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
                  History
                </Typography>

                <Button
                  variant="text"
                  sx={{
                    textTransform: "none",
                    color: theme.palette.primary.main,
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  View all →
                </Button>
              </Box>

              {/* History items with vertical dividers between them */}
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
                    title: "Coding Assistance Requested",
                    time: "30 minutes ago",
                  },
                  {
                    id: "write-article",
                    title: "Write an article about AI Assistant",
                    time: "1 day ago",
                  },
                  {
                    id: "romania-weather",
                    title: "Romania weather in September",
                    time: "2 days ago",
                  },
                ].map((item, index, array) => (
                  <React.Fragment key={item.id}>
                    <Box
                      onClick={() => handleChatHistoryClick(item.id)}
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
