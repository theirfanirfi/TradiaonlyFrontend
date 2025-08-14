"use client";

import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Checkbox,
  FormGroup,
  Badge,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Warning as WarningIcon,
  LocalShipping as ShippingIcon,
  Description as InvoiceIcon,
  School as LearnIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  AccountBalance as ATOIcon,
  AccountBalance as AccountBalanceIcon,
  Receipt as GSTIcon,
  Savings as SuperIcon,
  Support as GovernmentIcon,
  Help as ExplainIcon,
  ToggleOn as ToggleIcon,
  CloudUpload as BatchIcon,
  Gavel as DisputeIcon,
  Checklist as ChecklistIcon,
  Speed as RiskIcon,
  Link as IntegrationIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  RocketLaunch,
  Inventory2 as Inventory2Icon,
} from "@mui/icons-material";

const TradiaToolsSubmenu = ({ theme, onClose, onBack, setMessage }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionMode, setActionMode] = useState(true); // true = Action Mode, false = Explain Mode
  const [batchFiles, setBatchFiles] = useState([]);
  const [riskScore, setRiskScore] = useState(null);
  const [checklist, setChecklist] = useState({});

  // Core Trade Tools
  const coreTools = [
    {
      id: "import-risk",
      title: "Import Risk Analysis",
      description:
        "Upload your invoice, packing list, or item photo. Tradia AI will scan for common import risks like asbestos, timber packaging, DAFF triggers, or wrong Incoterms.",
      icon: <WarningIcon sx={{ color: "#ff9800" }} />,
      buttonText: "Upload Document",
      category: "trade",
      riskLevel: "high",
      exampleOutput:
        "⚠️ Timber structure detected. May require treatment or DAFF declaration.",
    },
    {
      id: "export-risk",
      title: "Export Risk Analysis",
      description:
        "Scan your export documents and check for compliance issues with ABF, overseas customs, or Incoterm mismatches.",
      icon: <ShippingIcon sx={{ color: "#2196f3" }} />,
      buttonText: "Upload Invoice or Export Docs",
      category: "trade",
      riskLevel: "medium",
      exampleOutput:
        "✅ HS code appears accurate, but missing country of origin statement.",
    },
    {
      id: "invoice-checker",
      title: "Invoice & Packing List Checker",
      description:
        "Check if your invoice and packing list meet ICS and freight compliance standards.",
      icon: <InvoiceIcon sx={{ color: "#4caf50" }} />,
      buttonText: "Upload PDF",
      category: "trade",
      riskLevel: "low",
      exampleOutput:
        "Missing value declaration line. Consider adding total CIF value.",
    },
    {
      id: "trade-explainer",
      title: "Trade Explainer (Learn Mode)",
      description:
        "Type a question or upload a document. Tradia AI will explain what it means and what to do.",
      icon: <LearnIcon sx={{ color: "#9c27b0" }} />,
      buttonText: "Ask Question",
      category: "trade",
      riskLevel: "info",
      exampleOutput: "AI explains DAP in plain English.",
      isTextBased: true,
    },
  ];

  // Extended Government Tools
  const governmentTools = [
    {
      id: "ato-analysis",
      title: "ATO Document Analysis",
      description:
        "Upload an ATO fine or letter, and the AI explains what it means, what your rights are, and what actions you can take.",
      icon: <ATOIcon sx={{ color: "#d32f2f" }} />,
      buttonText: "Upload ATO Document",
      category: "government",
      riskLevel: "high",
      exampleOutput:
        "This is a penalty notice for late BAS lodgement. You have 28 days to object or pay.",
    },
    {
      id: "gst-bas-check",
      title: "GST and BAS Check",
      description:
        "Review tax statements and highlight missing fields or logic issues.",
      icon: <GSTIcon sx={{ color: "#ff5722" }} />,
      buttonText: "Upload Tax Document",
      category: "government",
      riskLevel: "medium",
      exampleOutput:
        "GST calculation appears correct, but G1 field may need verification.",
    },
    {
      id: "super-guidance",
      title: "Superannuation Guidance",
      description:
        "Summarise employer obligations or check if a contribution is deductible.",
      icon: <SuperIcon sx={{ color: "#607d8b" }} />,
      buttonText: "Upload Super Document",
      category: "government",
      riskLevel: "low",
      exampleOutput:
        "Employer contribution meets SG requirements. Personal contribution is tax deductible.",
    },
    {
      id: "government-support",
      title: "General Government Support",
      description:
        "Explain Centrelink or Services Australia documents in plain English.",
      icon: <GovernmentIcon sx={{ color: "#795548" }} />,
      buttonText: "Upload Government Letter",
      category: "government",
      riskLevel: "info",
      exampleOutput:
        "This letter confirms your JobSeeker payment rate change effective next fortnight.",
    },
    {
      id: "complex-notices",
      title: "Explain Complex Notices",
      description:
        "Any formal government letter can be uploaded and decoded by the AI.",
      icon: <ExplainIcon sx={{ color: "#3f51b5" }} />,
      buttonText: "Upload Notice",
      category: "government",
      riskLevel: "info",
      exampleOutput:
        "This compliance notice requires action within 21 days to avoid penalties.",
    },
  ];

  // Advanced Features
  const advancedTools = [
    {
      id: "batch-upload",
      title: "Batch Upload + Bulk Review",
      description:
        "Upload multiple documents and receive a unified compliance report.",
      icon: <BatchIcon sx={{ color: "#00bcd4" }} />,
      buttonText: "Select Multiple Files",
      category: "advanced",
      riskLevel: "info",
      isBatch: true,
      exampleOutput:
        "Processed 5 documents: 2 compliant, 2 minor issues, 1 requires attention.",
    },
    {
      id: "dispute-helper",
      title: "Dispute Helper / Objection Drafting",
      description:
        "AI drafts responses to ATO fines, DAFF notices, or customs penalties.",
      icon: <DisputeIcon sx={{ color: "#e91e63" }} />,
      buttonText: "Upload Penalty Notice",
      category: "advanced",
      riskLevel: "high",
      exampleOutput:
        "Draft objection prepared. Key arguments: procedural fairness, penalty reduction grounds.",
    },
    {
      id: "smart-checklists",
      title: "Smart Checklists & Lodgement Guides",
      description:
        "Dynamic checklists to help users meet documentation requirements before submission.",
      icon: <ChecklistIcon sx={{ color: "#8bc34a" }} />,
      buttonText: "Generate Checklist",
      category: "advanced",
      riskLevel: "info",
      isChecklist: true,
      exampleOutput:
        "Import checklist: 8/12 items complete. Missing: phytosanitary certificate, DAFF permit.",
    },
    {
      id: "auto-match-bicon",
      title: "Auto-Match to Import Conditions (BICON-style)",
      description:
        "AI identifies goods and maps them to BICON import conditions.",
      icon: <IntegrationIcon sx={{ color: "#ff9800" }} />,
      buttonText: "Analyze Product",
      category: "advanced",
      riskLevel: "medium",
      exampleOutput:
        "Product matches BICON condition IC001: Requires import permit and quarantine inspection.",
    },
  ];

  const allTools = [...coreTools, ...governmentTools, ...advancedTools];

  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "#ef4444"; // Red
      case "medium":
        return "#f59e0b"; // Amber
      case "low":
        return "#22c55e"; // Green
      default:
        return "#3b82f6"; // Info Blue
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case "high":
        return <ErrorIcon sx={{ fontSize: 16 }} />;
      case "medium":
        return <WarningIcon sx={{ fontSize: 16 }} />;
      case "low":
        return <CheckIcon sx={{ fontSize: 16 }} />;
      default:
        return <InfoIcon sx={{ fontSize: 16 }} />;
    }
  };

  const handleFileUpload = (event, toolId) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsProcessing(true);
      setUploadStatus(null);

      const tool = allTools.find((t) => t.id === toolId);

      if (tool?.isBatch) {
        setBatchFiles(Array.from(files));
      }

      setTimeout(() => {
        const randomScore = Math.floor(Math.random() * 100);
        setRiskScore(randomScore);

        setUploadStatus({
          success: true,
          message: `Document${
            files.length > 1 ? "s" : ""
          } uploaded successfully for ${tool.title}`,
          analysis: tool.exampleOutput,
          riskScore: randomScore,
        });
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handleQuestionSubmit = (toolId) => {
    const tool = allTools.find((t) => t.id === toolId);
    setMessage(`Please explain: What does DAP Singapore mean? (${tool.title})`);
    onClose();
  };

  const generateChecklist = (toolId) => {
    const sampleChecklist = {
      "Commercial Invoice": false,
      "Packing List": true,
      "Bill of Lading": true,
      "Import Permit": false,
      "Phytosanitary Certificate": false,
      "Country of Origin Certificate": true,
      "Insurance Certificate": false,
      "DAFF Declaration": false,
    };
    setChecklist(sampleChecklist);
  };

  const handleChecklistChange = (item) => {
    setChecklist((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  if (selectedTool) {
    const tool = allTools.find((t) => t.id === selectedTool);

    return (
      <Box
        sx={{
          width: 380,
          height: "100vh",
          backgroundColor:
            theme.palette.mode === "dark" ? "#33363F" : "#ffffff",
          borderRight: `1px solid ${
            theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
          }`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${
              theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
            }`,
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor:
              theme.palette.mode === "dark" ? "#2D3748" : "#f9fafb",
          }}
        >
          <IconButton
            onClick={() => setSelectedTool(null)}
            size="small"
            sx={{ color: theme.palette.text.secondary }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {tool.title}
            </Typography>
            <Chip
              icon={getRiskIcon(tool.riskLevel)}
              label={tool.riskLevel.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: `${getRiskColor(tool.riskLevel)}15`,
                color: getRiskColor(tool.riskLevel),
                fontSize: "0.7rem",
                height: 20,
              }}
            />
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: theme.palette.text.secondary }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2, flex: 1, overflowY: "auto" }}>
          {/* Mode Toggle */}
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={actionMode}
                  onChange={(e) => setActionMode(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: theme.palette.text.primary }}
                  >
                    {actionMode ? "Action Mode" : "Explain Mode"}
                  </Typography>
                </Box>
              }
            />
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: theme.palette.text.secondary,
                mt: 0.5,
              }}
            >
              {actionMode
                ? "Compliance checks and actions"
                : "Learning and explanations"}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
              lineHeight: 1.5,
            }}
          >
            {tool.description}
          </Typography>

          {/* Live Risk Scoring */}
          {riskScore !== null && (
            <Paper
              sx={{
                p: 2,
                mb: 2,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.02)",
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
                }`,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              >
                <RiskIcon sx={{ color: "#3b82f6" }} />
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  Live Risk Score
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={riskScore}
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#374151" : "#f3f4f6",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        riskScore > 70
                          ? "#ef4444"
                          : riskScore > 40
                          ? "#f59e0b"
                          : "#22c55e",
                      borderRadius: 4,
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    minWidth: 40,
                  }}
                >
                  {riskScore}%
                </Typography>
              </Box>
            </Paper>
          )}

          {/* Upload Interface */}
          <Paper
            sx={{
              p: 3,
              mb: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.02)",
              border: `2px dashed ${
                theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
              }`,
              textAlign: "center",
            }}
          >
            {tool.isTextBased ? (
              <Box>
                <LearnIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.text.secondary,
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Ask any question or upload a document
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Type your question here..."
                  sx={{
                    mb: 2,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#2D3748" : "#ffffff",
                  }}
                  InputProps={{
                    style: { color: theme.palette.text.primary },
                  }}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleQuestionSubmit(tool.id)}
                    sx={{
                      backgroundColor: "#4280ef",
                      "&:hover": { backgroundColor: "#3366cc" },
                      color: "#ffffff",
                    }}
                  >
                    Ask Question
                  </Button>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      borderColor:
                        theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB",
                      color: theme.palette.text.primary,
                      "&:hover": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#6B7280" : "#D1D5DB",
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    Upload Document
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, tool.id)}
                    />
                  </Button>
                </Box>
              </Box>
            ) : tool.isBatch ? (
              <Box>
                <BatchIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.text.secondary,
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {isProcessing
                    ? "Processing batch..."
                    : "Select multiple files for bulk analysis"}
                </Typography>
                {isProcessing ? (
                  <CircularProgress size={24} />
                ) : (
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "#4280ef",
                      "&:hover": { backgroundColor: "#3366cc" },
                      color: "#ffffff",
                    }}
                  >
                    {tool.buttonText}
                    <input
                      type="file"
                      hidden
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, tool.id)}
                    />
                  </Button>
                )}
                {batchFiles.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Selected files: {batchFiles.length}
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : tool.isChecklist ? (
              <Box>
                <ChecklistIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.text.secondary,
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Generate a smart checklist for your compliance needs
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => generateChecklist(tool.id)}
                  sx={{
                    backgroundColor: "#4280ef",
                    "&:hover": { backgroundColor: "#3366cc" },
                    color: "#ffffff",
                  }}
                >
                  {tool.buttonText}
                </Button>
              </Box>
            ) : (
              <Box>
                <UploadIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.text.secondary,
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {isProcessing ? "Processing..." : "Click to upload"}
                </Typography>
                {isProcessing ? (
                  <CircularProgress size={24} />
                ) : (
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "#4280ef",
                      "&:hover": { backgroundColor: "#3366cc" },
                      color: "#ffffff",
                    }}
                  >
                    {tool.buttonText}
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, tool.id)}
                    />
                  </Button>
                )}
              </Box>
            )}
          </Paper>

          {/* Smart Checklist Display */}
          {Object.keys(checklist).length > 0 && (
            <Paper
              sx={{
                p: 2,
                mb: 2,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.02)",
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
                }`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Import Documentation Checklist
              </Typography>
              <FormGroup>
                {Object.entries(checklist).map(([item, checked]) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={() => handleChecklistChange(item)}
                        size="small"
                        sx={{
                          color: theme.palette.text.secondary,
                          "&.Mui-checked": { color: "#3b82f6" },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "0.85rem",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {item}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Progress: {Object.values(checklist).filter(Boolean).length}/
                  {Object.keys(checklist).length} complete
                </Typography>
              </Box>
            </Paper>
          )}

          {/* Upload Status */}
          {uploadStatus && (
            <Alert
              severity={uploadStatus.success ? "success" : "error"}
              sx={{
                mb: 2,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(22,163,74,0.1)"
                    : "rgba(22,163,74,0.2)",
              }}
            >
              {uploadStatus.message}
            </Alert>
          )}

          {/* Analysis Results */}
          {uploadStatus && uploadStatus.analysis && (
            <Paper
              sx={{
                p: 2,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(22,163,74,0.1)"
                    : "rgba(22,163,74,0.05)",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(22,163,74,0.3)"
                    : "rgba(22,163,74,0.2)"
                }`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.text.primary, mb: 1 }}
              >
                Analysis Result:
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {uploadStatus.analysis}
              </Typography>
            </Paper>
          )}

          {/* Example Output */}
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              Example Output:
            </Typography>
            <Paper
              sx={{
                p: 2,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.01)",
                border: `1px solid ${
                  theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
                }`,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontStyle: "italic",
                }}
              >
                {tool.exampleOutput}
              </Typography>
            </Paper>
          </Box>

          {/* Government Integration Status */}
          {tool.category === "government" && (
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.text.primary, mb: 1 }}
              >
                Government Integration Status:
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.01)",
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
                  }`,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <IntegrationIcon
                    sx={{ fontSize: 16, color: theme.palette.text.secondary }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    API Integration Ready - Placeholder for future connections
                  </Typography>
                </Box>
                <Chip
                  label="Development Phase"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 193, 7, 0.1)",
                    color: "#ff9800",
                    fontSize: "0.7rem",
                  }}
                />
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 380,
        height: "100vh",
        backgroundColor: theme.palette.mode === "dark" ? "#33363F" : "#ffffff",
        borderRight: `1px solid ${
          theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
        }`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${
            theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor:
            theme.palette.mode === "dark" ? "#2D3748" : "#f9fafb",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.primary,
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          What Can Tradia AI Help With?
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: theme.palette.text.secondary }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Mode Toggle at Top */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${
            theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
          }`,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={actionMode}
              onChange={(e) => setActionMode(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: theme.palette.text.primary }}
              >
                {actionMode ? "Action Mode" : "Explain Mode"}
              </Typography>
            </Box>
          }
        />
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: theme.palette.text.secondary,
            mt: 0.5,
          }}
        >
          {actionMode
            ? "Compliance checks and actions"
            : "Learning and explanations"}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {/* Core Trade Tools */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "whitesmoke",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Inventory2Icon sx={{ fontSize: 20 }} />
              Core Trade Tools
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              p: 0,
              backgroundColor:
                theme.palette.mode === "dark" ? "#2D3748" : "#f9fafb",
            }}
          >
            <List sx={{ py: 0 }}>
              {coreTools.map((tool, index) => (
                <React.Fragment key={tool.id}>
                  <ListItem
                    button
                    onClick={() => setSelectedTool(tool.id)}
                    sx={{
                      px: 2,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Badge
                        badgeContent={getRiskIcon(tool.riskLevel)}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: getRiskColor(tool.riskLevel),
                            color: "white",
                            right: -2,
                            top: -2,
                          },
                        }}
                      >
                        {tool.icon}
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary={tool.title}
                      secondary={tool.description}
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: theme.palette.text.primary,
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          mb: 0.5,
                        },
                        "& .MuiListItemText-secondary": {
                          color: theme.palette.text.secondary,
                          fontSize: "0.75rem",
                          lineHeight: 1.4,
                        },
                      }}
                    />
                  </ListItem>
                  {index < coreTools.length - 1 && (
                    <Divider
                      sx={{
                        mx: 2,
                        opacity: 0.3,
                        borderColor:
                          theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Government Tools */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "whitesmoke",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 20 }} />
              Government & Tax Tools
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              p: 0,
              backgroundColor:
                theme.palette.mode === "dark" ? "#2D3748" : "#f9fafb",
            }}
          >
            <List sx={{ py: 0 }}>
              {governmentTools.map((tool, index) => (
                <React.Fragment key={tool.id}>
                  <ListItem
                    button
                    onClick={() => setSelectedTool(tool.id)}
                    sx={{
                      px: 2,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Badge
                        badgeContent={getRiskIcon(tool.riskLevel)}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: getRiskColor(tool.riskLevel),
                            color: "white",
                            right: -2,
                            top: -2,
                          },
                        }}
                      >
                        {tool.icon}
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary={tool.title}
                      secondary={tool.description}
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: theme.palette.text.primary,
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          mb: 0.5,
                        },
                        "& .MuiListItemText-secondary": {
                          color: theme.palette.text.secondary,
                          fontSize: "0.75rem",
                          lineHeight: 1.4,
                        },
                      }}
                    />
                  </ListItem>
                  {index < governmentTools.length - 1 && (
                    <Divider
                      sx={{
                        mx: 2,
                        opacity: 0.3,
                        borderColor:
                          theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Advanced Features */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "whitesmoke",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <RocketLaunch sx={{ fontSize: 20, color: "whitesmoke" }} />
              Advanced Features
            </Typography>
          </AccordionSummary>
          {/* <AccordionDetails sx={{ p: 0, backgroundColor: theme.palette.mode === "dark" ? "#2D3748" : "#f9fafb" }}>
            <List sx={{ py: 0 }}>
              {advancedTools.map((tool, index) => (
                <React.Fragment key={tool.id}>
                  <ListItem
                    button
                    onClick={() => setSelectedTool(tool.id)}
                    sx={{
                      px: 2,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Badge
                        badgeContent={getRiskIcon(tool.riskLevel)}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: getRiskColor(tool.riskLevel),
                            color: "white",
                            right: -2,
                            top: -2,
                          },
                        }}
                      >
                        {tool.icon}
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary={tool.title}
                      secondary={tool.description}
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: theme.palette.text.primary,
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          mb: 0.5,
                        },
                        "& .MuiListItemText-secondary": {
                          color: theme.palette.text.secondary,
                          fontSize: "0.75rem",
                          lineHeight: 1.4,
                        },
                      }}
                    />
                  </ListItem>
                  {index < advancedTools.length - 1 && (
                    <Divider sx={{ mx: 2, opacity: 0.3, borderColor: theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB" }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails> */}
        </Accordion>
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${
            theme.palette.mode === "dark" ? "#4B5563" : "#E5E7EB"
          }`,
          backgroundColor:
            theme.palette.mode === "dark" ? "#2D3748" : "#f9fafb",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            display: "block",
            textAlign: "center",
          }}
        >
          Select a tool to get started with Tradia AI assistance
        </Typography>
      </Box>
    </Box>
  );
};

export default TradiaToolsSubmenu;
