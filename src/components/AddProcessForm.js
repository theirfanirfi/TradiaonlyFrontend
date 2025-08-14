// components/AddProcessForm.js
import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {ProcessAPI} from "../lib/api"
const AddProcessForm = ({ theme, onAddProcess }) => {
  const [processName, setProcessName] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!processName.trim()) {
      setError("Process name is required");
      return;
    }

    if (processName.trim().length < 3) {
      setError("Process name must be at least 3 characters long");
      return;
    }

    if (processName.trim().length > 100) {
      setError("Process name must be less than 100 characters");
      return;
    }

    // Clear any existing errors
    setError("");

    // Add the process
    onAddProcess(processName.trim());

    // Reset form
    setProcessName("");

    // Show success message
    setShowSuccess(true);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  const handleInputChange = (e) => {
    setProcessName(e.target.value);
    if (error) {
      setError(""); // Clear error when user starts typing
    }
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.default,
          borderRadius: "12px",
          border: `1px solid ${
            theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: theme.palette.text.primary,
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AddIcon sx={{ color: theme.palette.primary.main }} />
            Initiate New Process
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <TextField
              fullWidth
              label="Process Name"
              variant="outlined"
              value={processName}
              onChange={handleInputChange}
              error={!!error}
              helperText={error || "Enter a descriptive name for the process"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.palette.background.default,
                  "& fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.text.secondary,
                  "&.Mui-focused": {
                    color: theme.palette.primary.main,
                  },
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.text.primary,
                },
                "& .MuiFormHelperText-root": {
                  color: error ? "#d32f2f" : theme.palette.text.secondary,
                },
              }}
              placeholder="e.g., User Registration Process"
              autoComplete="off"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: theme.palette.background.paper,
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "#5a8cf0" : "#3366cc",
                },
                "&:disabled": {
                  backgroundColor: theme.palette.action.disabled,
                },
              }}
            >
              Start Process
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontStyle: "italic",
            }}
          >
            * Process names should be descriptive and unique
          </Typography>
        </Box>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          icon={<CheckCircleIcon />}
        >
          Process added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddProcessForm;