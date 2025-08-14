// components/NotificationBanner.js
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

const NotificationBanner = ({ theme }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
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
        onClick={() => setVisible(false)}
        sx={{
          fontSize: "14px",
          ml: 1,
          color: "red",
          cursor: "pointer",
        }}
      />
    </Box>
  );
};

export default NotificationBanner;