import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MessageBubble from "./MessageBubble";

const ChatArea = ({
  theme,
  isMobile,
  chatId,
  chatHistory,
  message,
  setMessage,
  attachedFiles,
  setAttachedFiles,
  fileInputRef,
  handleSendMessage,
  handleDrawerToggle,
  handleThemeToggle,
  navigate,
  aiResponse,
  lastMessageRef = null, // Optional ref for the last message bubble
  isLoading = false, // Optional loading state
}) => {
  // const currentChat = chatId ? chatHistory[chatId] : null;

  const handleAttachFiles = (e) => {
    const selected = Array.from(e.target.files);
    const validFiles = selected.filter(
      (file) => file.type === "application/pdf"
    );

    if (attachedFiles.length + validFiles.length > 5) {
      alert("You can attach a maximum of 5 PDF files.");
      return;
    }

    setAttachedFiles((prev) => [...prev, ...validFiles]);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.mode === "dark" ? "#33363F" : "inherit",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: `1px solid ${
            theme.palette.mode === "light" ? "#878E9B" : "#4B5563"
          }`,
          backgroundColor:
            theme.palette.mode === "dark" ? "#33363F" : "inherit",
          height: "64px",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: "none" },
                color: theme.palette.text.primary,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: theme.palette.text.primary }}
          >
            AI Chat
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Toggle Theme">
            <IconButton
              onClick={handleThemeToggle}
              sx={{ color: theme.palette.text.primary }}
            >
              <Brightness4Icon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              onClick={() => navigate("/")}
              sx={{ color: theme.palette.text.primary }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <IconButton sx={{ color: theme.palette.text.primary }}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          mx: "auto",
          width: "100%",
          backgroundColor:
            theme.palette.mode === "dark" ? "#33363F" : "inherit",
          overflow: "hidden",
        }}
      >
        {chatHistory && chatHistory?.length > 0 ? (
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box sx={{ flex: 1, overflowY: "auto", p: 4, width: "100%" }}>
              {/* Render messages */}

              {chatHistory.map((chat, index) => {
                const isLastMessage = index === chatHistory.length - 1;
                return (
                  <MessageBubble
                    key={chat.id}
                    message={chat}
                    theme={theme}
                    isUser={chat.type === "user"}
                    ref={isLastMessage ? lastMessageRef : null}
                  />
                );
              })}

              {isLoading && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    my: 2,
                    ml: 2,
                    color: theme.palette.text.secondary,
                  }}
                >
                  <CircularProgress size={20} thickness={4} />
                  <Typography variant="body2">AI is typing...</Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ p: 4, pt: 0, width: "100%", flexShrink: 0 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Message Tradia AI"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <>
                        <input
                          type="file"
                          accept="application/pdf"
                          multiple
                          hidden
                          ref={fileInputRef}
                          onChange={handleAttachFiles}
                        />
                        <IconButton
                          onClick={() => fileInputRef.current?.click()}
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          <AttachFileIcon />
                        </IconButton>
                      </>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSendMessage}
                        disabled={!(message.trim() || attachedFiles.length > 0)}
                        sx={{
                          backgroundColor: message.trim()
                            ? theme.palette.primary.main
                            : theme.palette.mode === "light"
                            ? "#E5E7EB"
                            : "#4B5563",
                          color: "white",
                          "&:hover": {
                            backgroundColor: message.trim()
                              ? "#3366cc"
                              : theme.palette.mode === "light"
                              ? "#E5E7EB"
                              : "#4B5563",
                          },
                          "&.Mui-disabled": {
                            backgroundColor:
                              theme.palette.mode === "light"
                                ? "#E5E7EB"
                                : "#4B5563",
                            color: theme.palette.text.secondary,
                          },
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    backgroundColor:
                      theme.palette.mode === "light" ? "#ffffff" : "#2D3748",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:
                        theme.palette.mode === "light" ? "#E5E7EB" : "#4B5563",
                    },
                    "&:hover fieldset": {
                      borderColor:
                        theme.palette.mode === "light" ? "#D1D5DB" : "#6B7280",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "& input": { color: theme.palette.text.primary },
                    "& .MuiInputBase-input::placeholder": {
                      color: theme.palette.text.secondary,
                      opacity: 1,
                    },
                  },
                }}
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {attachedFiles.map((file, index) => (
                  <Chip
                    key={index}
                    label={file.name}
                    onDelete={() =>
                      setAttachedFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "light" ? "#F3F4F6" : "#4B5563",
                      color: theme.palette.text.primary,
                      borderRadius: "16px",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              width: "100%",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 4,
                fontWeight: "bold",
                fontFamily: "IBM Plex Mono",
                fontSize: { xs: "28px", sm: "36px", md: "48px" },
                color: theme.palette.text.primary,
                textAlign: "center",
              }}
            >
              What can I help with?
            </Typography>
            <Box sx={{ width: "100%", maxWidth: "600px", mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Message Tradia AI"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <>
                        <input
                          type="file"
                          accept="application/pdf"
                          multiple
                          hidden
                          ref={fileInputRef}
                          onChange={handleAttachFiles}
                        />
                        <IconButton
                          onClick={() => fileInputRef.current?.click()}
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          <AttachFileIcon />
                        </IconButton>
                      </>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        sx={{
                          backgroundColor: message.trim()
                            ? theme.palette.primary.main
                            : theme.palette.mode === "light"
                            ? "#E5E7EB"
                            : "#4B5563",
                          color: "white",
                          "&:hover": {
                            backgroundColor: message.trim()
                              ? "#3366cc"
                              : theme.palette.mode === "light"
                              ? "#E5E7EB"
                              : "#4B5563",
                          },
                          "&.Mui-disabled": {
                            backgroundColor:
                              theme.palette.mode === "light"
                                ? "#E5E7EB"
                                : "#4B5563",
                            color: theme.palette.text.secondary,
                          },
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    backgroundColor:
                      theme.palette.mode === "light" ? "#ffffff" : "#2D3748",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:
                        theme.palette.mode === "light" ? "#E5E7EB" : "#4B5563",
                    },
                    "&:hover fieldset": {
                      borderColor:
                        theme.palette.mode === "light" ? "#D1D5DB" : "#6B7280",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "& input": { color: theme.palette.text.primary },
                    "& .MuiInputBase-input::placeholder": {
                      color: theme.palette.text.secondary,
                      opacity: 1,
                    },
                  },
                }}
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {attachedFiles.map((file, index) => (
                  <Chip
                    key={index}
                    label={file.name}
                    onDelete={() =>
                      setAttachedFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "light" ? "#F3F4F6" : "#4B5563",
                      color: theme.palette.text.primary,
                      borderRadius: "16px",
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
                maxWidth: "600px",
              }}
            >
              {[
                "Article",
                "Weather",
                "Sport",
                "Press",
                "Food",
                "Plants",
                "Suggest something",
              ].map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion}
                  onClick={() => setMessage(suggestion)}
                  sx={{
                    backgroundColor: "transparent",
                    border: `1px solid ${
                      theme.palette.mode === "light" ? "#E5E7EB" : "#4B5563"
                    }`,
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      backgroundColor: "rgba(66, 128, 239, 0.1)",
                      borderColor: theme.palette.primary.main,
                    },
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatArea;
