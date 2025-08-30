// InvoiceDetail.js
import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  Typography,

  Button,

} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { createAppTheme } from "../theme/theme";
import { DocumentsAPI, ItemsAPI } from "../lib/api";

function InvoiceDetail() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("themeMode") === "dark";
    }
    return false;
  });

  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdf, setPDF] = useState(null);

  const navigate = useNavigate();
  const { processId, invoiceId } = useParams();
  console.log("Process ID:", processId, "Invoice ID:", invoiceId);
  const theme = createAppTheme(darkMode ? "dark" : "light");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchInvoiceDetails = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const response = await DocumentsAPI.get_invoice_items(invoiceId);
      setInvoiceData(response);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetch_invoicePdf = async () => {
    let url = null;
  let response = await DocumentsAPI.get_invoice_pdf(invoiceId);
      url = URL.createObjectURL(response);
  setPDF(url);
  console.log('PDF data', url);
  }

  useEffect(() => {
    if (invoiceId) {
      fetchInvoiceDetails();
      fetch_invoicePdf();
    }
  }, [invoiceId]);




  const handleClose = () => {
    navigate(`/process/${processId}`);
  };

  if (loading || !invoiceData) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
          <Typography>Loading...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Header Bar */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            zIndex: 1200,
          }}
        >

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "#000000", fontWeight: "bold" }}>
              Invoice Detail Panel
            </Typography>
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            mt: "60px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* PDF Preview Section */}
            <iframe
              title="PDF"
              src={pdf? pdf : null}
              style={{ width: "60%"}}
            />

          {/* Right Panel - Items List */}
          <Box
            sx={{
              width: "40%",
              backgroundColor: "#f8f9fa",
              overflow: "auto",
            }}
          >
            <Box sx={{ p: 3 }}>

              {/* Items List */}
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  mb: 3,
                }}
              >
                {invoiceData && invoiceData.items && invoiceData.items.items.map((item, index) => {
                  return(
                      <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid #e0e0e0",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                   {`Item `+(index+1)}: {item.item_title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666666", display: "block", mt: 1 }}>
                   HS Code: {item.item_hs_code}                   <Button
                  onClick={ async ()=> {
                    let data = await ItemsAPI.reassign_hscode(item.item_id);
                    if(data.success){
                      alert('HS Code will be re-assigned in a while, you can check back after 1 minute');
                    }else {
                      alert('Error re-assigning HS Code');
                    }
                  }}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#ff9800",
                      color: "white",
                      textTransform: "none",
                      fontSize: "12px",
                    }}
                  >
                    Re-assign
                  </Button>
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666666", display: "block" }}>
                    {item.item_weight} {item.item_weight_unit}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666666", display: "block" }}>
                    {item.item_price} {item.item_currency}
                  </Typography>
                </Box>
                  )
                })
              }



                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                   Total Weight <strong>{invoiceData.document?.llm_response?.total_weight}</strong>
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                   Total Items <strong>{invoiceData.items.total}</strong>
                  </Typography>
                </Box>
              </Box>


              {/* Status Section */}
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  p: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography variant="body2" sx={{ color: "#d32f2f" }}>
                    Items Missing ?
                  </Typography>
                  <Button
                  onClick={ async ()=> {
                    let data = await DocumentsAPI.retry_document_extraction(invoiceId);
                    if(data.status === 'success'){
                      alert('Document extraction started, you can check after 10 minutes');
                    }else {
                      alert('Error retrying document extraction');
                    }
                  }}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#ff9800",
                      color: "white",
                      textTransform: "none",
                      fontSize: "12px",
                    }}
                  >
                    Retry Extraction
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default InvoiceDetail;