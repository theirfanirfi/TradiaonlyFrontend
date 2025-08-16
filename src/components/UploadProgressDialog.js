import React from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Alert,
  Fade,
} from "@mui/material";
import {
  CloudUpload,
  Close,
  CheckCircle,
  Error,
} from "@mui/icons-material";

const UploadProgressDialog = ({
  open,
  progress = 0,
  status = "uploading", // "uploading", "success", "error"
  uploadedCount = 0,
  totalFiles = 0,
  onClose,
  position = { bottom: 24, right: 24 },
  width = 320,
  successMessage,
  errorMessage,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle sx={{ color: "success.main", mr: 1 }} />;
      case "error":
        return <Error sx={{ color: "error.main", mr: 1 }} />;
      default:
        return <CloudUpload sx={{ color: "primary.main", mr: 1 }} />;
    }
  };

  const getStatusTitle = () => {
    // switch (status) {
    //   case "CREATED":
    //     return "UPloading files";
    //   case "Extracting":
    //     return "Upload Failed";
    //   default:
    //     return "Uploading Files...";
    // }
    return status;
  };

  return (
    <Fade in={open}>
      <Paper
        sx={{
          position: "fixed",
          bottom: position.bottom,
          right: position.right,
          width,
          p: 2,
          zIndex: 1300,
          boxShadow: (theme) => theme.shadows[8],
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {getStatusIcon()}
          
          <Typography variant="subtitle2" sx={{ flex: 1 }}>
            {getStatusTitle()}
          </Typography>

          <IconButton 
            size="small" 
            onClick={onClose}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {status === "uploading" && (
          <>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              {uploadedCount} of {totalFiles} files uploaded ({Math.round(progress)}%)
            </Typography>
          </>
        )}

        {status === "success" && (
          <Alert severity="success" sx={{ mt: 1 }}>
            {successMessage || `Successfully uploaded ${totalFiles} file${totalFiles !== 1 ? "s" : ""}`}
          </Alert>
        )}

        {status === "error" && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {errorMessage || "Failed to upload files. Please try again."}
          </Alert>
        )}
      </Paper>
    </Fade>
  );
};

export default UploadProgressDialog;
