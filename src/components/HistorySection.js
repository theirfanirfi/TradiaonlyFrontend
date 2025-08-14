// components/HistorySection.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { historyItems } from "../data/chatHistory";

const HistorySection = ({ theme, onChatHistoryClick }) => {
  return (
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
        {historyItems.map((item, index, array) => (
          <React.Fragment key={item.id}>
            <Box
              onClick={() => onChatHistoryClick(item.id)}
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
                  width: "2px",
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "#013459"
                      : "#cedcf0",
                  my: 2,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default HistorySection;