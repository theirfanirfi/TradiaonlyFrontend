// components/ProcessTable.js
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const ProcessTable = ({ theme, processes, onDeleteProcess }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [processToDelete, setProcessToDelete] = useState(null);

  const handleDeleteClick = (process) => {
    setProcessToDelete(process);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (processToDelete) {
      onDeleteProcess(processToDelete.process_id);
      setDeleteDialogOpen(false);
      setProcessToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProcessToDelete(null);
  };

  if (processes.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          color: theme.palette.text.secondary,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          No processes found
        </Typography>
        <Typography variant="body2">
          Add your first process using the form above.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "8px",
          boxShadow: theme.palette.mode === "dark" 
            ? "0 4px 6px rgba(0, 0, 0, 0.3)" 
            : "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="process table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme.palette.mode === "dark" 
                  ? "rgba(255, 255, 255, 0.05)" 
                  : "rgba(0, 0, 0, 0.05)",
              }}
            >
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  fontSize: "16px",
                }}
              >
                Process ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  fontSize: "16px",
                }}
              >
                Process Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  fontSize: "16px",
                  width: "120px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processes.map((process) => (
              <TableRow
                key={process.process_id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: theme.palette.mode === "dark" 
                      ? "rgba(255, 255, 255, 0.02)" 
                      : "rgba(0, 0, 0, 0.02)",
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" 
                      ? "rgba(255, 255, 255, 0.08)" 
                      : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <TableCell
                  sx={{
                    color: theme.palette.text.primary,
                    fontFamily: "monospace",
                    fontWeight: "500",
                  }}
                >
                  {process.process_id}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: "400",
                  }}
                >
                  {process.process_name}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Delete Process" arrow>
                    <IconButton
                      onClick={() => handleDeleteClick(process)}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.1)",
                        },
                      }}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        <DialogTitle
          id="delete-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: theme.palette.text.primary,
          }}
        >
          <WarningAmberIcon sx={{ color: "#ff9800" }} />
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="delete-dialog-description"
            sx={{ color: theme.palette.text.secondary }}
          >
            Are you sure you want to delete the process "
            <strong>{processToDelete?.process_name}</strong>"? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: theme.palette.text.secondary,
              color: theme.palette.text.primary,
              "&:hover": {
                borderColor: theme.palette.text.primary,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProcessTable;