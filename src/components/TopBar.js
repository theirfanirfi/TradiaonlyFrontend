// components/TopBar.js
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

const TopBar = ({
  theme,
  isMobile,
  onDrawerToggle,
  onThemeToggle,
  onLogout,
  onNavigate,
}) => {
  return (
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
            onClick={onDrawerToggle}
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
            onClick={onThemeToggle}
            sx={{ color: theme.palette.text.primary }}
          >
            <Brightness4Icon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton
            onClick={() => onNavigate("/")}
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
  );
};

export default TopBar;