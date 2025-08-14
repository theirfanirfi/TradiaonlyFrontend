import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
} from "@mui/material"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import AddIcon from "@mui/icons-material/Add" // Import AddIcon
import Logo from "./Logo"

const BaseSidebar = ({
  theme,
  mobileOpen,
  onClose,
  isMobile,
  chatHistory,
  chatId,
  navigate,
  children,
}) => {
  // Handle navigation for chat history click
  const handleChatHistoryClick = (chatHistoryId) => {
    navigate(`/chat/${chatHistoryId}`);
  };

  // Handle navigation for new chat
  const handleNewChat = () => {
    navigate("/main");
  };

  return (
    <>
      {isMobile ? (
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
              width: 260,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.sidebarPrimary,
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            },
          }}
        >
          <Box sx={{ p: 2, color: theme.palette.text.sidebarPrimary, flexShrink: 0 }}>
            <Logo />
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ color: "white" }} />}
              onClick={handleNewChat}
              sx={{
                mb: 2,
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#20438F",
                color: "white",
                borderRadius: 8,
                py: 1,
                width: "100%",
                justifyContent: "flex-start",
                "&:hover": {
                  backgroundColor: "#3366cc",
                },
              }}
            >
              Start new chat
            </Button>
            <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 2 }} />
            {children && (
              <Box sx={{ mb: 2 }}>
                {children}
                <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, my: 2 }} />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 1,
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
            }}
          >
            <List sx={{ px: 0, py: 1 }}>
              {Object.values(chatHistory).map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  onClick={() => handleChatHistoryClick(chat.id)}
                  sx={{
                    pl: 1,
                    pr: 1,
                    py: 1,
                    borderRadius: 4,
                    backgroundColor: chatId === chat.id ? "rgba(66, 128, 239, 0.2)" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
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
                        fontWeight: 500,
                      },
                      "& .MuiListItemText-secondary": {
                        color: theme.palette.text.sidebarSecondary,
                        fontSize: "0.75rem",
                      },
                      margin: 0,
                      padding: 0,
                    }}
                  />
                </ListItem>
              ))}
              <ListItem
                button
                sx={{
                  pl: 1,
                  pr: 1,
                  py: 1,
                  borderRadius: 4,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <ListItemText
                  primary="View all"
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: theme.palette.text.sidebarSecondary,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    },
                    margin: 0,
                    padding: 0,
                  }}
                />
              </ListItem>
            </List>
          </Box>
          <Box sx={{ p: 2, flexShrink: 0 }}>
            <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 2 }} />
            <Button
              variant="outlined"
              fullWidth
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                textTransform: "none",
                justifyContent: "space-between",
                borderColor: theme.palette.divider,
                color: theme.palette.text.sidebarPrimary,
                borderRadius: 8,
                "&:hover": {
                  borderColor: theme.palette.grey[500],
                  backgroundColor:
                    theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
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
        </Drawer>
      ) : (
        <Box
          sx={{
            width: 280,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.sidebarPrimary,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            height: "100vh",
            borderRight: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ p: 2, flexShrink: 0 }}>
            <Logo />
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ color: "white" }} />}
              onClick={handleNewChat}
              sx={{
                mb: 2,
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#20438F",
                color: "white",
                borderRadius: 8,
                py: 1,
                width: "100%",
                justifyContent: "flex-start",
                "&:hover": {
                  backgroundColor: "#3366cc",
                },
              }}
            >
              Start new chat
            </Button>
            <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 2 }} />
            {children && (
              <Box sx={{ mb: 2 }}>
                {children}
                <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, my: 2 }} />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 1,
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
            }}
          >
            <List sx={{ px: 0, py: 1 }}>
              {Object.values(chatHistory).map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  onClick={() => handleChatHistoryClick(chat.id)}
                  sx={{
                    pl: 1,
                    pr: 1,
                    py: 1,
                    borderRadius: 4,
                    backgroundColor: chatId === chat.id ? "rgba(66, 128, 239, 0.2)" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
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
                        fontWeight: 500,
                      },
                      "& .MuiListItemText-secondary": {
                        color: theme.palette.text.sidebarSecondary,
                        fontSize: "0.75rem",
                      },
                      margin: 0,
                      padding: 0,
                    }}
                  />
                </ListItem>
              ))}
              <ListItem
                button
                sx={{
                  pl: 1,
                  pr: 1,
                  py: 1,
                  borderRadius: 4,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <ListItemText
                  primary="View all"
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: theme.palette.text.sidebarSecondary,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    },
                    margin: 0,
                    padding: 0,
                  }}
                />
              </ListItem>
            </List>
          </Box>
          <Box sx={{ p: 2, flexShrink: 0 }}>
            <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 2 }} />
            <Button
              variant="outlined"
              fullWidth
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                textTransform: "none",
                justifyContent: "space-between",
                borderColor: theme.palette.divider,
                color: theme.palette.text.sidebarPrimary,
                borderRadius: 8,
                "&:hover": {
                  borderColor: theme.palette.grey[500],
                  backgroundColor:
                    theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
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
        </Box>
      )}
    </>
  );
};

export default BaseSidebar;