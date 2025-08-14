// components/Sidebar.js
import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import Logo from "./Logo";

const Sidebar = ({
  theme,
  isMobile,
  mobileOpen,
  onClose,
  onAiChat,
  onChatHistoryClick,
  chatHistory,
}) => {
  const SidebarContent = () => (
    <Box sx={{ color: theme.palette.text.sidebarPrimary }}>
      <Logo />

      <Button
        variant="contained"
        startIcon={<AddIcon sx={{ color: "white" }} />}
        onClick={onAiChat}
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
          onClick={onAiChat}
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
              onClick={() => onChatHistoryClick(chat.id)}
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
    </Box>
  );

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
            color: theme.palette.text.sidebarPrimary,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <SidebarContent />
        </Box>
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        width: 280,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.sidebarPrimary,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        p: 3,
        borderRight: `1px solid ${
          theme.palette.mode === "light" ? "#4B5563" : "#4B5563"
        }`,
      }}
    >
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;