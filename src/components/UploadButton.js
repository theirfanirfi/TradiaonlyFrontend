import React from "react";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const UploadButton = ({
  onClick,
  children = "Upload Files",
  variant = "contained",
  startIcon = <CloudUpload />,
  disabled = false,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};

export default UploadButton;