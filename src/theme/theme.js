import { createTheme } from "@mui/material/styles";

export function createAppTheme(mode = "light") {
  return createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#121212" : "#f9f9f9", // page background
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",   // cards, Paper
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
        secondary: mode === "dark" ? "#cccccc" : "#555555",
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? "#bbbbbb" : "#333333", // label color
            "&.Mui-focused": {
              color: mode === "dark" ? "#ffffff" : "#000000",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            color: mode === "dark" ? "#ffffff" : "#000000", // text inside input
          },
          notchedOutline: {
            borderColor: mode === "dark" ? "#888888" : "#cccccc",
          },
        },
      },
    },
  });
}
