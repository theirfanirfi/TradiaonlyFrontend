// theme/theme.js
import { createTheme } from "@mui/material";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#4280EF" },
          background: {
            default: "#ffffff",
            paper: "#374151",
          },
          text: {
            primary: "#050519",
            secondary: "#666666",
            sidebarPrimary: "#ffffff",
            sidebarSecondary: "#D1D5DB",
          },
        }
      : {
          primary: { main: "#4280EF" },
          background: {
            default: "#33363F",
            paper: "#050519",
          },
          text: {
            primary: "#ffffff",
            secondary: "#bbbbbb",
            sidebarPrimary: "#ffffff",
            sidebarSecondary: "#bbbbbb",
          },
        }),
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));