import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { createAppTheme } from "../theme/theme";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import InvoiceList from "../components/InvoiceList";
import UploadModal from "../components/UploadModal";
import UploadProgressDialog from "../components/UploadProgressDialog";
import UploadButton from "../components/UploadButton";
import useFileUpload from "../hooks/useFileUpload";
import { chatHistoryData } from "../data/chatHistory";
import { ProcessAPI, DocumentsAPI } from "../lib/api";

function Process() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("themeMode") === "dark";
    }
    return false;
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processName, setProcessName] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const navigate = useNavigate();
  const { processId } = useParams();
  const theme = createAppTheme(darkMode ? "dark" : "light");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [process, setProcess] = useState(null);

  // Upload functionality using the custom hook
  const {
    isUploading,
    uploadProgress,
    uploadStatus,
    uploadedCount,
    totalFiles,
    startUpload,
    reset: resetUpload,
  } = useFileUpload(
    // Real upload function using DocumentsAPI
    async (files, onProgress) => {
      return await DocumentsAPI.upload(processId, files, onProgress);
    },
    // Check invoice status function
    async () => {
      return await ProcessAPI.status(processId);
    }
    ,
    {
      simulate: false, // Using real API now
      onSuccess: (files) => {
        console.log(`Successfully uploaded ${files.length} files`);
        fetchInvoices(); // Refresh invoices after successful upload
      },
      onError: (error) => {
        console.error("Upload failed:", error);
        // You can add user notification here (toast, alert, etc.)
      },
      autoHideDelay: 0,
    }
  );


  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await DocumentsAPI.list(processId);
      console.log('Documents response:', response);
      
      if (response && response.documents && response.documents.length > 0) {
        setInvoices(response.documents);
        setProcess(response.process);
      } else {
        // If no documents returned, show mock data
        // setInvoices(mockeINvoices);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      // Fallback to mock data on error
      // setInvoices(mockeINvoices);
    } finally {
      setLoading(false);
    }
  };

  const fetchProcessDetails = async () => {
    try {
      const response = await ProcessAPI.get(processId);
      console.log('fetchProcessDetails response:', response);
      setProcessName(response.process_name || `Process ${processId}`);
    } catch (error) {
      console.error("Error fetching process details:", error);
      setProcessName(`Import/Export Process ${processId}`);
    }
  };

  useEffect(() => {
    if (processId) {
      fetchInvoices();
      fetchProcessDetails();
    }
  }, [processId]);

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

  const handleInvoiceClick = (invoiceId) => {
    navigate(`/processes/${processId}/invoice/${invoiceId}`);
  };

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  const handleUploadModalClose = () => {
    setUploadModalOpen(false);
  };

  const handleFilesUpload = async (files) => {
    setUploadModalOpen(false);
    await startUpload(files);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar
          theme={theme}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onClose={handleDrawerToggle}
        />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
          }}
        >
          <TopBar
            theme={theme}
            isMobile={isMobile}
            onDrawerToggle={handleDrawerToggle}
            onThemeToggle={handleThemeToggle}
            onLogout={handleLogout}
            onNavigate={navigate}
          />

          <Container
            maxWidth="lg"
            sx={{
              flex: 1,
              py: 3,
              overflow: "auto",
              backgroundColor: "#ffffff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                {processName}
              </Typography>

              <UploadButton
                onClick={handleUploadClick}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Upload Invoices
              </UploadButton>
            </Box>

            <InvoiceList
              invoices={invoices}
              loading={loading}
              process={process}
              onInvoiceClick={handleInvoiceClick}
            />
          </Container>
        </Box>

        {/* Upload Modal */}
        <UploadModal
          open={uploadModalOpen}
          onClose={handleUploadModalClose}
          onUpload={handleFilesUpload}
          title="Upload Invoices"
          acceptedFileTypes=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
        />

        {/* Upload Progress Dialog */}
        <UploadProgressDialog
          open={isUploading}
          progress={uploadProgress}
          status={uploadStatus}
          uploadedCount={uploadedCount}
          totalFiles={totalFiles}
          onClose={resetUpload}
        />
      </Box>
    </ThemeProvider>
  );
}

export default Process;