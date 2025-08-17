// components/InvoiceList.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import ScaleIcon from "@mui/icons-material/Scale";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DeleteIcon from "@mui/icons-material/Delete";

const InvoiceList = ({ invoices, loading, process, onInvoiceClick, onDeleteDocument }) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show document table if process status is not "Done"
  if (process?.status == "Done") {
    return (
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="document table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: "14px",
                }}
              >
                Document Title
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: "14px",
                }}
              >
                OCR Text
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: "14px",
                  textAlign: "center",
                  width: "120px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: "14px",
                  textAlign: "center",
                  width: "80px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices?.map((document, index) => (
              <TableRow
                key={document.id || index}
                sx={{
                  backgroundColor: "#ffffff",
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f8f9fa",
                  },
                  "&:hover": {
                    backgroundColor: "#e9ecef",
                  },
                }}
              >
                <TableCell sx={{ color: "#000000" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DescriptionIcon sx={{ fontSize: 16, color: "#666666" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "500",
                        color: "#000000",
                        fontSize: "13px",
                      }}
                    >
                      {document.document_name || `Document ${index + 1}`}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "#000000" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666666",
                      fontSize: "13px",
                    }}
                  >
                    {document.ocr_text?.length > 20 
                      ? `${document.ocr_text.substring(0, 20)}...` 
                      : document.ocr_text || "No text available"}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Chip
                    label={process.status}
                    size="small"
                    sx={{
                      backgroundColor: 
                        process.status === "Processing" ? "#ff9800" :
                        process.status === "Failed" ? "#f44336" :
                        process.status === "Pending" ? "#9e9e9e" :
                        "#2196f3",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <IconButton
                    size="small"
                    onClick={() => onDeleteDocument && onDeleteDocument(document.document_id)}
                    sx={{
                      color: "#f44336",
                      "&:hover": {
                        backgroundColor: "rgba(244, 67, 54, 0.1)",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {(!invoices || invoices.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                  <DescriptionIcon sx={{ fontSize: 48, color: "#cccccc", mb: 1 }} />
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    No documents found for this process
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (invoices.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          color: "#666666",
        }}
      >
        <DescriptionIcon sx={{ fontSize: 64, color: "#cccccc", mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          No invoices found
        </Typography>
        <Typography variant="body2">
          No invoices have been processed for this process yet.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e0e0e0",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="invoice table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: "14px",
                width: "80px",
                textAlign: "center",
              }}
            >
              Qty
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: "14px",
              }}
            >
              Items
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: "14px",
                textAlign: "center",
                width: "120px",
              }}
            >
              Price
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: "14px",
                textAlign: "center",
                width: "120px",
              }}
            >
              Weight
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: "14px",
                textAlign: "center",
                width: "100px",
              }}
            >
              Total
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: "14px",
                textAlign: "center",
                width: "140px",
              }}
            >
              Comm.Descr
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#000000",
                fontSize: "14px",
                textAlign: "center",
                width: "120px",
              }}
            >
              HS Code
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow
              key={invoice.id}
              onClick={() => onInvoiceClick(invoice.id)}
              sx={{
                backgroundColor: "#ffffff",
                "&:nth-of-type(odd)": {
                  backgroundColor: "#f8f9fa",
                },
                "&:hover": {
                  backgroundColor: "#e9ecef",
                  cursor: "pointer",
                },
              }}
            >
              <TableCell
                sx={{
                  color: "#000000",
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                {index}
              </TableCell>
              <TableCell sx={{ color: "#000000" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <InventoryIcon sx={{ fontSize: 16, color: "#666666" }} />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "600",
                          color: "#000000",
                          fontSize: "13px",
                        }}
                      >
                        GRAPPLE YT250305-07 HYDRAULIC ROTATOR
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666666",
                        fontSize: "12px",
                        display: "block",
                        lineHeight: 1.4,
                      }}
                    >
                      Parts suitable for use solely or principally with the machinery of headings 84.25 to 84.30.
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label="Check code"
                        size="small"
                        sx={{
                          backgroundColor: "#ff6b35",
                          color: "white",
                          fontSize: "11px",
                          height: "20px",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={invoice.status === "verified" ? "No" : "Yes"}
                      variant="outlined"
                      size="small"
                      sx={{
                        fontSize: "11px",
                        height: "22px",
                        borderColor: invoice.status === "verified" ? "#1976d2" : "#ff9800",
                        color: invoice.status === "verified" ? "#1976d2" : "#ff9800",
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "#666666", fontSize: "11px" }}>
                      Verified:
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 2,
                    pt: 1,
                    borderTop: "1px solid #e0e0e0",
                  }}
                >
                  <Button
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontSize: "11px",
                      color: "#666666",
                      minWidth: "auto",
                      p: 0.5,
                    }}
                  >
                    Page 1
                  </Button>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Button
                      size="small"
                      variant="text"
                      sx={{
                        minWidth: "20px",
                        width: "20px",
                        height: "20px",
                        p: 0,
                        color: "#666666",
                      }}
                    >
                      ✏️
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      sx={{
                        minWidth: "20px",
                        width: "20px",
                        height: "20px",
                        p: 0,
                        color: "#666666",
                      }}
                    >
                      📄
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      sx={{
                        minWidth: "20px",
                        width: "20px",
                        height: "20px",
                        p: 0,
                        color: "#666666",
                      }}
                    >
                      🗑️
                    </Button>
                  </Box>
                  <Box sx={{ ml: "auto" }}>
                    <Typography variant="caption" sx={{ color: "#666666", fontSize: "11px" }}>
                      Item 1
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell sx={{ color: "#000000", textAlign: "center", fontWeight: "500" }}>
                {invoice.total_price}
              </TableCell>
              <TableCell sx={{ color: "#000000", textAlign: "center", fontWeight: "500" }}>
                {invoice.total_weight}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Chip
                  label="$0"
                  size="small"
                  sx={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                />
                <Typography variant="caption" sx={{ display: "block", fontSize: "10px", color: "#666666", mt: 0.5 }}>
                  CNY
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                  <Typography variant="body2" sx={{ color: "#000000", fontSize: "13px" }}>
                    GRAPPLE ROTATOR
                  </Typography>
                  <Button
                    size="small"
                    sx={{
                      minWidth: "16px",
                      width: "16px",
                      height: "16px",
                      p: 0,
                      color: "#666666",
                    }}
                  >
                    ✏️
                  </Button>
                </Box>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#000000",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    84314100.00
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontSize: "11px",
                      color: "#1976d2",
                      p: 0,
                      minHeight: "auto",
                      textDecoration: "underline",
                    }}
                  >
                    Change Tariff
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          p: 2,
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            fontSize: "14px",
            borderColor: "#cccccc",
            color: "#666666",
            "&:hover": {
              borderColor: "#999999",
            },
          }}
        >
          + Add Item
        </Button>
      </Box>
    </TableContainer>
  );
};

export default InvoiceList;