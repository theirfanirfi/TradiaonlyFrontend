// InvoiceDetail.js
import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  Typography,
  Container,
  Paper,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { createAppTheme } from "../theme/theme";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { chatHistoryData } from "../data/chatHistory";
import { InvoiceAPI } from "../lib/api";

function InvoiceDetail() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("themeMode") === "dark";
    }
    return false;
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGroups, setShowGroups] = useState(false);
  const [verified, setVerified] = useState("No");
  const [currency, setCurrency] = useState("CNY");

  const navigate = useNavigate();
  const { processId, invoiceId } = useParams();
  const theme = createAppTheme(darkMode ? "dark" : "light");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchInvoiceDetails = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const response = await InvoiceAPI.getDetails(invoiceId);
      setInvoiceData(response);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
      // Mock data for demonstration
      setInvoiceData({
        doc_no: "SHBNE250400002",
        bl_no: "AHG02331130P08",
        shipper: {
          name: "YANTAI RIMA MACHINERY CO., LTD. XIBEIYU INDUSTRY ZONE, LAIZHOU, SHANDONG, CHINA",
          tel: "+86-535-6805690"
        },
        consignee: {
          name: "BRADLEYTHOMAS",
          address: "25 MOLLER ST, GORDONVALE QLD 4865 AUSTRALIA",
          tel: "+61481042746",
          email: "BRADLEY@THOMASARBORI CULTURE.COM.AU"
        },
        notify_party: {
          name: "SAME AS CONSIGNEE"
        },
        notify_party_detail: {
          name: "ASEA360 CONSOLIDATION PTY LTD",
          address: "9/2 TULLAMARINE PARK ROAD, TULLAMARINE VIC 3043 PO BOX 659, TULLAMARINE VIC 3043",
          tel: "+613 8346 0166",
          fax: "+613 9338 7447"
        },
        vessel_info: {
          ocean_vessel: "ANL GIPPSLAND 082S",
          port_of_loading: "SHANGHAI,CHINA",
          place_of_receipt: "SHANGHAI,CHINA",
          port_of_discharge: "BRISBANE,AUSTRALIA",
          place_of_delivery: "BRISBANE,AUSTRALIA"
        },
        particulars: {
          marks_numbers: "1PKGS",
          description: "SAID TO CONTAIN",
          gross_weight: "237KGS",
          measurement: "0.92CBM"
        },
        items: [
          {
            id: 1,
            description: "GRAPPLE YT250305-07 HYDRAULIC ROTATOR",
            quantity: 0,
            weight: "0.00",
            price: 0
          }
        ],
        total_items: 1,
        total_weight: "0.00"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (invoiceId) {
      fetchInvoiceDetails();
    }
  }, [invoiceId]);

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    sessionStorage.setItem("themeMode", newMode ? "dark" : "light");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("themeMode");
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAiChat = () => {
    navigate("/chat");
  };

  const handleChatHistoryClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

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
            <FormControl size="small">
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                sx={{ minWidth: 80 }}
              >
                <MenuItem value="CNY">CNY</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "#000000", fontWeight: "bold" }}>
              Invoice Detail Panel
            </Typography>
            <IconButton onClick={() => setShowGroups(!showGroups)}>
              {showGroups ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ color: "#666666" }}>
              Show Groups: {showGroups ? "on" : "off"}
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
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
          <Box
            sx={{
              width: "60%",
              borderRight: "1px solid #e0e0e0",
              backgroundColor: "#ffffff",
              overflow: "auto",
            }}
          >
            <Box sx={{ p: 3 }}>
              {/* Invoice Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <img
                  src="/api/placeholder/100/40"
                  alt="World Jaguar Logistics"
                  style={{ marginBottom: "16px" }}
                />
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000000", mb: 1 }}>
                  World Jaguar Logistics Inc.
                </Typography>
                <Typography variant="h6" sx={{ color: "#666666", mb: 2 }}>
                  COMBINED TRANSPORT BILL OF LADING
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    color: "rgba(128, 0, 128, 0.3)",
                    fontWeight: "bold",
                    fontSize: "80px",
                    letterSpacing: "20px",
                  }}
                >
                  COPY
                </Typography>
              </Box>

              {/* Document Info */}
              <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    DOC No: <strong>{invoiceData.doc_no}</strong>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    B/L No: <strong>{invoiceData.bl_no}</strong>
                  </Typography>
                </Box>
              </Box>

              {/* Shipper, Consignee, Notify Party */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 4 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Shipper
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666", lineHeight: 1.4 }}>
                    {invoiceData.shipper.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    TEL/FAX:{invoiceData.shipper.tel}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Consignee
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666", lineHeight: 1.4 }}>
                    {invoiceData.consignee.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    ADDRESS: {invoiceData.consignee.address}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    TEL:{invoiceData.consignee.tel}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    EMAIL: {invoiceData.consignee.email}
                  </Typography>
                </Box>
              </Box>

              {/* Notify Party */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Notify Party(Complete name and address)
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666", mb: 2 }}>
                  {invoiceData.notify_party.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666", fontStyle: "italic", mb: 1 }}>
                  Also notify: (Complete name and address)
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666", lineHeight: 1.4 }}>
                  {invoiceData.notify_party_detail.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666" }}>
                  {invoiceData.notify_party_detail.address}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666" }}>
                  TEL: {invoiceData.notify_party_detail.tel}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666" }}>
                  FAX: {invoiceData.notify_party_detail.fax}
                </Typography>
              </Box>

              {/* Vessel Information */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 4 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Place of Receipt
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    {invoiceData.vessel_info.place_of_receipt}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Port of Loading
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    {invoiceData.vessel_info.port_of_loading}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 4 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Ocean vessel
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    {invoiceData.vessel_info.ocean_vessel}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Port of Discharge
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    {invoiceData.vessel_info.port_of_discharge}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Place of Delivery
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666" }}>
                  {invoiceData.vessel_info.place_of_delivery}
                </Typography>
              </Box>

              {/* Particulars Table */}
              <Box sx={{ border: "2px solid #000000", mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                    p: 1,
                    borderBottom: "1px solid #000000",
                    fontWeight: "bold",
                  }}
                >
                  PARTICULARS FURNISHED BY SHIPPER
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 1fr 1fr",
                    borderBottom: "1px solid #000000",
                  }}
                >
                  <Box sx={{ p: 2, borderRight: "1px solid #000000" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Marks and numbers
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, borderRight: "1px solid #000000" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      No. of pkgs. Description of goods
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, borderRight: "1px solid #000000" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Gross weight
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Measurement
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 1fr 1fr",
                  }}
                >
                  <Box sx={{ p: 2, borderRight: "1px solid #000000" }}>
                    <Typography variant="body2">
                      {invoiceData.particulars.marks_numbers}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, borderRight: "1px solid #000000" }}>
                    <Typography variant="body2">
                      {invoiceData.particulars.description}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, borderRight: "1px solid #000000" }}>
                    <Typography variant="body2">
                      {invoiceData.particulars.gross_weight}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2">
                      {invoiceData.particulars.measurement}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Panel - Items List */}
          <Box
            sx={{
              width: "40%",
              backgroundColor: "#f8f9fa",
              overflow: "auto",
            }}
          >
            <Box sx={{ p: 3 }}>
              {/* Verification Status */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                  p: 2,
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Verified:
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip
                    label="No"
                    variant={verified === "No" ? "filled" : "outlined"}
                    size="small"
                    clickable
                    onClick={() => setVerified("No")}
                    sx={{
                      backgroundColor: verified === "No" ? "#1976d2" : "transparent",
                      color: verified === "No" ? "white" : "#1976d2",
                      borderColor: "#1976d2",
                    }}
                  />
                  <Chip
                    label="Yes"
                    variant={verified === "Yes" ? "filled" : "outlined"}
                    size="small"
                    clickable
                    onClick={() => setVerified("Yes")}
                    sx={{
                      backgroundColor: verified === "Yes" ? "#4caf50" : "transparent",
                      color: verified === "Yes" ? "white" : "#4caf50",
                      borderColor: "#4caf50",
                    }}
                  />
                </Box>
              </Box>

              {/* Page Navigation */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                  p: 2,
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Page 1
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ color: "#666666" }}>
                    {invoiceData.total_items} Items | {invoiceData.total_weight}
                  </Typography>
                </Box>
              </Box>

              {/* Items List */}
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid #e0e0e0",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    GRAPPLE YT250305-07 HYDRAULIC ROTATOR
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666666", display: "block", mt: 1 }}>
                    84314100.00 -
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666666", display: "block" }}>
                    GRAPPLE ROTATOR
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>0.00</strong>
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Chip
                      label="Multi-Select"
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: "#e0e0e0",
                        color: "#666666",
                      }}
                    />
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        border: "2px solid #e0e0e0",
                        borderRadius: "2px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  p: 2,
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      color: "#1976d2",
                      textDecoration: "underline",
                      textTransform: "none",
                    }}
                  >
                    View Invoice Detail
                  </Button>
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
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" sx={{ color: "#666666", display: "block", mb: 1 }}>
                  Item 2
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default InvoiceDetail;