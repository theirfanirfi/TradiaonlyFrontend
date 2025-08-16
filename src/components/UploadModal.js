import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import {
  CloudUpload,
  Close,
  Upload,
} from "@mui/icons-material";

const UploadModal = ({
  open,
  onClose,
  onUpload,
  title = "Upload Files",
  acceptedFileTypes = ".pdf,.jpg,.jpeg,.png,.xlsx,.xls",
  maxFiles = null,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleClose = () => {
    setSelectedFiles([]);
    onClose();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (maxFiles && files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files at once.`);
      return;
    }
    setSelectedFiles(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    if (maxFiles && files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files at once.`);
      return;
    }
    setSelectedFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (index) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
      setSelectedFiles([]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            border: `2px dashed ${isDragging ? "#1976d2" : "#ccc"}`,
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            backgroundColor: isDragging ? "#1976d210" : "transparent",
            cursor: "pointer",
            transition: "all 0.3s ease",
            mb: 2,
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("file-input-upload").click()}
        >
          <CloudUpload sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drag & drop files here
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or click to browse files
          </Typography>
          <input
            id="file-input-upload"
            type="file"
            multiple
            accept={acceptedFileTypes}
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </Box>

        {selectedFiles.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Selected Files ({selectedFiles.length}):
            </Typography>
            <Stack spacing={1} sx={{ maxHeight: 200, overflow: "auto" }}>
              {selectedFiles.map((file, index) => (
                <Chip
                  key={index}
                  label={`${file.name} (${formatFileSize(file.size)})`}
                  onDelete={() => removeFile(index)}
                  variant="outlined"
                  sx={{ justifyContent: "space-between" }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={selectedFiles.length === 0}
          startIcon={<Upload />}
        >
          Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? "s" : ""}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;