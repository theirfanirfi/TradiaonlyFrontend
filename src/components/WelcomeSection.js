// components/WelcomeSection.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

const WelcomeSection = ({ theme, userName, onAiChat }) => {
  return (
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
        Good morning, {userName}
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
        onClick={onAiChat}
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
  );
};

export default WelcomeSection;