import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Alert,
  Paper,
  Divider,
  Stack,
  Tooltip,
  IconButton,
  Fade,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VerifiedIcon from "@mui/icons-material/Verified";
import PsychologyIcon from "@mui/icons-material/Psychology";

const MessageBubble = ({ message, theme, isUser, ref }) => {
  const renderConfidenceBar = (confidence) => {
    const getConfidenceColor = (conf) => {
      if (conf >= 80) return "#22c55e"; // Green
      if (conf >= 70) return "#10b981"; // Emerald (close to guideline yellow)
      if (conf >= 60) return "#f59e0b"; // Amber
      return "#ef4444"; // Red
    };

    const getConfidenceLabel = (conf) => {
      if (conf >= 80) return "High";
      if (conf >= 70) return "Good";
      if (conf >= 60) return "Medium";
      return "Low";
    };

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            minWidth: "70px",
          }}
        >
          Confidence:
        </Typography>
        <Box sx={{ flex: 1, maxWidth: "120px" }}>
          <LinearProgress
            variant="determinate"
            value={confidence}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor:
                theme.palette.mode === "dark" ? "#374151" : "#f3f4f6",
              "& .MuiLinearProgress-bar": {
                backgroundColor: getConfidenceColor(confidence),
                borderRadius: 3,
              },
            }}
          />
        </Box>
        <Chip
          label={`${confidence}% ${getConfidenceLabel(confidence)}`}
          size="small"
          sx={{
            height: 24,
            fontSize: "0.75rem",
            fontWeight: 600,
            backgroundColor: `${getConfidenceColor(confidence)}15`,
            color: getConfidenceColor(confidence),
            border: `1px solid ${getConfidenceColor(confidence)}30`,
          }}
        />
      </Box>
    );
  };

  const renderTrustIndicator = (verified, confidence) => {
    let trustConfig = {};
    if (verified && confidence >= 70) {
      trustConfig = {
        tier: "Tier 1",
        label: "Verified Source",
        color: "#22c55e",
        bgColor: "#22c55e10",
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />, // Updated to green checkmark
        description: "Information verified from trusted sources",
      };
    } else if (!verified && confidence >= 60) {
      trustConfig = {
        tier: "Tier 2",
        label: "Model Memory - Verify Before Action", // Updated label
        color: "#f59e0b", // Adjusted to guideline yellow
        bgColor: "#f59e0b10",
        icon: <WarningIcon sx={{ fontSize: 16 }} />, // Updated to warning icon
        description:
          "Based on AI model training - verify before critical decisions",
      };
    } else {
      trustConfig = {
        tier: "Tier 3",
        label: "Low Confidence",
        color: "#ef4444",
        bgColor: "#ef444410",
        icon: <ErrorIcon sx={{ fontSize: 16 }} />,
        description: "Low confidence response - manual review recommended",
      };
    }

    return (
      <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
        <Tooltip title={trustConfig.description} arrow placement="top">
          <Chip
            icon={trustConfig.icon}
            label={trustConfig.label}
            size="small"
            sx={{
              backgroundColor: trustConfig.bgColor,
              color: trustConfig.color,
              border: `1px solid ${trustConfig.color}30`,
              fontWeight: 600,
              "& .MuiChip-icon": {
                color: trustConfig.color,
              },
            }}
          />
        </Tooltip>
        <Chip
          label={trustConfig.tier}
          size="small"
          variant="outlined"
          sx={{
            borderColor: trustConfig.color,
            color: trustConfig.color,
            fontWeight: 500,
            fontSize: "0.7rem",
          }}
        />
      </Box>
    );
  };

  const renderSourceInfo = (source, verified) => {
    const isExternalSource =
      source !== "LLM-internal (no document match found in RAG)";

    return (
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 2,
          backgroundColor:
            theme.palette.mode === "dark" ? "#1f2937" : "#f8fafc",
          border: `1px solid ${
            theme.palette.mode === "dark" ? "#374151" : "#e2e8f0"
          }`,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InfoIcon
            sx={{
              fontSize: 16,
              color: theme.palette.text.secondary,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              flex: 1,
            }}
          >
            Source:{" "}
            {isExternalSource ? (
              <Box
                component="span"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
              >
                <Typography
                  component="a"
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="caption"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  External Document
                </Typography>
                <IconButton
                  component="a"
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    p: 0.25,
                    color: theme.palette.primary.main,
                  }}
                >
                  <OpenInNewIcon sx={{ fontSize: 12 }} />
                </IconButton>
              </Box>
            ) : (
              <Typography
                component="span"
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontStyle: "italic",
                }}
              >
                AI Model Knowledge Base
              </Typography>
            )}
          </Typography>
        </Box>
      </Paper>
    );
  };

  const renderAlerts = (confidence, verified) => {
    const alerts = [];

    if (confidence < 60) {
      alerts.push(
        <Alert
          key="very-low"
          severity="error"
          icon={<ErrorIcon fontSize="inherit" />}
          sx={{
            mb: 1,
            "& .MuiAlert-message": {
              fontWeight: 500,
            },
          }}
        >
          Critical: Confidence below 60%. Manual review and verification
          strongly recommended.
        </Alert>
      );
    } else if (confidence < 70) {
      alerts.push(
        <Alert
          key="low"
          severity="warning"
          icon={<WarningIcon fontSize="inherit" />}
          sx={{
            mb: 1,
            "& .MuiAlert-message": {
              fontWeight: 500,
            },
          }}
        >
          Caution: Medium confidence. Please verify before taking action.
        </Alert>
      );
    }

    if (!verified && confidence >= 60) {
      alerts.push(
        <Alert
          key="unverified"
          severity="info"
          icon={<InfoIcon fontSize="inherit" />}
          sx={{
            mb: 1,
            "& .MuiAlert-message": {
              fontWeight: 500,
            },
          }}
        >
          This response is based on AI model knowledge. Consider verifying with
          official sources.
        </Alert>
      );
    }

    return alerts;
  };

  const renderForm = (form) => {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <a
          href={form}
          download={`parsed_form_${Date.now()}.json`}
          style={{ textDecoration: "none" }}
        >
          <Chip label="Download JSON" color="primary" variant="outlined" />
        </a>
      </Box>
    );
  };
  const renderAiMessage = (msgContent) => {
    if (typeof msgContent === "object" && msgContent.answer) {
      const { answer, confidence, reason, source, verified } = msgContent;

      return (
        <Fade in={true} timeout={600}>
          <Box>
            {/* Main Answer */}
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                mb: 3,
                lineHeight: 1.6,
                fontSize: "0.95rem",
              }}
            >
              {answer}
            </Typography>

            <Divider sx={{ mb: 3, opacity: 0.3 }} />

            {/* Metadata Section */}
            <Stack spacing={2}>
              {/* Trust Indicator */}
              {renderTrustIndicator(verified, confidence)}

              {/* Confidence Bar */}
              {renderConfidenceBar(confidence)}

              {/* Source Information */}
              {renderSourceInfo(source, verified)}

              {/* Reasoning */}
              {reason && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      display: "block",
                      mb: 0.5,
                    }}
                  >
                    Reasoning:
                  </Typography>
                  <Tooltip title={reason} arrow placement="top">
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontStyle: "italic",
                        display: "block",
                        cursor: reason.length > 80 ? "help" : "default",
                      }}
                    >
                      {reason.length > 80
                        ? `${reason.slice(0, 80)}...`
                        : reason}
                    </Typography>
                  </Tooltip>
                </Box>
              )}
              {/* Alerts */}
              {renderAlerts(confidence, verified)}
            </Stack>
          </Box>
        </Fade>
      );
    }

    return (
      <Typography
        variant="body1"
        sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
      >
        {msgContent}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 3,
      }}
      ref={ref}
    >
      <Paper
        elevation={isUser ? 2 : 1}
        sx={{
          maxWidth: "75%",
          p: 3,
          borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
          backgroundColor: isUser
            ? theme.palette.primary.main
            : theme.palette.mode === "light"
            ? "#ffffff"
            : "#2d3748",
          color: isUser ? "white" : theme.palette.text.primary,
          border: isUser
            ? "none"
            : `1px solid ${
                theme.palette.mode === "light" ? "#e2e8f0" : "#4a5568"
              }`,
          position: "relative",
          "&::before": isUser
            ? {}
            : {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${
                  theme.palette.primary.main
                }, ${
                  theme.palette.secondary.main || theme.palette.primary.light
                })`,
                borderRadius: "20px 20px 0 0",
              },
        }}
      >
        {renderAiMessage(message.content)}
        {message.form && renderForm(message.form)}
      </Paper>
    </Box>
  );
};

export default MessageBubble;
