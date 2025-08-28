"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme,
  useMediaQuery,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material"
import { Close } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import googleIconclr from "../images/googlelogo.png"
import { AuthAPI } from "../lib/api"

const getDesignTokens = (mode) => ({
  palette: {
    mode: mode || (typeof window !== "undefined" ? sessionStorage.getItem("themeMode") || "dark" : "dark"),
    ...(mode === "light"
      ? {
          primary: { main: "#4280EF" },
          background: { default: "#ffffff", paper: "#ffffff" },
          text: { primary: "#050519", secondary: "#666666" },
        }
      : {
          primary: { main: "#4280EF" },
          background: { default: "#1a1d29", paper: "#252837" },
          text: { primary: "#ffffff", secondary: "#9ca3af" },
        }),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: mode === "dark" ? "transparent" : "#ffffff",
            borderRadius: "12px",
            "& fieldset": {
              borderColor: mode === "dark" ? "#4b5563" : "#d1d5db",
            },
            "&:hover fieldset": {
              borderColor: mode === "dark" ? "#6b7280" : "#9ca3af",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4280EF",
            },
          },
          "& .MuiInputLabel-root": {
            color: mode === "dark" ? "#9ca3af" : "#6b7280",
            fontSize: "0.875rem",
            "&.Mui-focused": {
              color: "#4280EF",
            },
            "&.MuiInputLabel-shrunk": {
              fontSize: "0.75rem",
            },
          },
          "& .MuiOutlinedInput-input": {
            color: mode === "dark" ? "#ffffff" : "#111827",
            fontSize: "0.875rem",
            "&::placeholder": {
              color: mode === "dark" ? "#6b7280" : "#9ca3af",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
        },
        contained: {
          backgroundColor: "#4280EF",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#3366cc",
          },
        },
        outlined: {
          borderColor: mode === "dark" ? "#374151" : "#d1d5db",
          color: mode === "dark" ? "#ffffff" : "#374151",
          "&:hover": {
            borderColor: mode === "dark" ? "#4b5563" : "#9ca3af",
            backgroundColor: mode === "dark" ? "rgba(75, 85, 99, 0.1)" : "rgba(156, 163, 175, 0.1)",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: mode === "dark" ? "#6b7280" : "#9ca3af",
          "&.Mui-checked": {
            color: "#4280EF",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          "&::before, &::after": {
            borderColor: mode === "dark" ? "#374151" : "#e5e7eb",
          },
        },
      },
    },
  },
})

function SignupPage({ onBackToLogin }) {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" ? sessionStorage.getItem("themeMode") === "dark" : true,
  )

  const theme = createTheme(getDesignTokens(darkMode ? "dark" : "light"))
  const muiTheme = useTheme()
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"))

  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [signUpFullname, setSignUpFullname] = useState("")
  const [SignUpUsername, setSignUpUsername] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [showTermsModal, setShowTermsModal] = useState(false)

  const navigate = useNavigate()

  const handleThemeChange = (event, newMode) => {
    if (newMode !== null) {
      setDarkMode(newMode === "dark")
      sessionStorage.setItem("themeMode", newMode)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (signUpPassword !== confirmPassword) {
      setPasswordsMatch(false)
      return
    }
    console.log({ signUpEmail, signUpPassword, agreeToTerms })
    navigate("/main")
  }

  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(signUpPassword === confirmPassword)
    } else {
      setPasswordsMatch(true)
    }
  }, [signUpPassword, confirmPassword])

  const handleModalClose = (shouldAgree = false) => {
    setShowTermsModal(false)
    if (shouldAgree) {
      setAgreeToTerms(true) // Automatically check the "Agree with Terms of Use" checkbox
    }
  }

  const TermsOfUseModal = ({ open, onClose }) => (
    <Dialog
      open={open}
      onClose={() => onClose(false)} // Pass false if closing via backdrop or close icon
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          maxHeight: "85vh",
          borderRadius: 3,
          boxShadow: theme.palette.mode === "dark" 
            ? "0 20px 40px rgba(0,0,0,0.4)" 
            : "0 20px 40px rgba(0,0,0,0.15)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 3,
          pt: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              backgroundColor: "#282C34",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            T
          </Box>
          <Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 700, 
              color: "#282C34",
              fontSize: "1.5rem",
              letterSpacing: "-0.02em"
            }}>
              Tradia AI
            </Typography>
            <Typography variant="subtitle2" sx={{ 
              color: theme.palette.text.secondary,
              fontSize: "0.85rem",
              fontWeight: 500
            }}>
              Terms of Use & Data Policy
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={() => onClose(false)} // Pass false if closing via close icon
          size="small"
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 4, px: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="body1" sx={{ 
            mb: 2, 
            lineHeight: 1.7,
            fontSize: "1.1rem",
            color: theme.palette.text.primary,
            fontWeight: 400
          }}>
            Welcome to <strong>Tradia AI</strong> — your intelligent assistant for navigating complex rules, 
            compliance, and decision-making across trade, logistics, workplace safety, taxation, and more.
          </Typography>
        </Box>

        {/* Data Responsibility */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: "#282C34",
            fontSize: "1.1rem",
            mb: 3,
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{ marginRight: "8px" }}>⚠️</span>
            Data Responsibility
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, color: theme.palette.text.secondary }}>
            For your protection, please <strong>do not enter</strong> sensitive personal data such as:
          </Typography>
          
          <Box sx={{ 
            backgroundColor: theme.palette.mode === "dark" ? "rgba(40, 44, 52, 0.1)" : "rgba(40, 44, 52, 0.05)",
            border: `1px solid ${theme.palette.divider}`,
            p: 3,
            borderRadius: 2,
            mb: 3
          }}>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {[
                "Passport or ID numbers",
                "Tax File Numbers (TFN)",
                "Health or medical information",
                "Banking or financial credentials"
              ].map((item, index) => (
                <Typography 
                  key={index}
                  component="li" 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    color: theme.palette.text.primary,
                    fontSize: "0.95rem"
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          
          <Typography variant="body2" sx={{ 
            lineHeight: 1.6,
            fontStyle: "italic",
            color: theme.palette.text.secondary
          }}>
            Use of this tool is at your own risk. By using Tradia AI, you accept full responsibility for the data you input.
          </Typography>
        </Box>

        {/* AI Accuracy & Limitations */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: "#282C34",
            fontSize: "1.1rem",
            mb: 3,
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{ marginRight: "8px" }}>ℹ️</span>
            AI Accuracy & Limitations
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
            Tradia AI uses public data, rules, and structured information to provide simplified guidance 
            across multiple regulatory areas.
          </Typography>
          
          <Box sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgba(40, 44, 52, 0.1)" : "rgba(40, 44, 52, 0.05)",
            border: `2px solid ${theme.palette.divider}`,
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            mb: 3
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              color: "#282C34",
              fontSize: "1.1rem",
              mb: 1
            }}>
              This is a guide, not a guarantee.
            </Typography>
            <Typography variant="body2" sx={{ 
              color: theme.palette.text.secondary,
              fontWeight: 500
            }}>
              Always confirm critical decisions with the relevant government authority, broker, or industry expert.
            </Typography>
          </Box>
        </Box>

        {/* Data Security */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: "#282C34",
            fontSize: "1.1rem",
            mb: 3,
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{ marginRight: "8px" }}>🔒</span>
            Data Security
          </Typography>
          
          <Box sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgba(40, 44, 52, 0.1)" : "rgba(40, 44, 52, 0.05)",
            border: `1px solid ${theme.palette.divider}`,
            p: 3,
            borderRadius: 2
          }}>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, fontWeight: 500 }}>
              ✓ All data is stored securely within <strong>IRAP-certified Australian data centres</strong>
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, fontWeight: 500 }}>
              ✓ We do not use your data to train third-party models or share it with external entities
            </Typography>
          </Box>
        </Box>

        {/* Feedback Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: "#282C34",
            fontSize: "1.1rem",
            mb: 3,
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{ marginRight: "8px" }}>💬</span>
            Feedback & Suggestions
          </Typography>
          
          <Box sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgba(40, 44, 52, 0.1)" : "rgba(40, 44, 52, 0.05)",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            p: 3
          }}>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
              Tradia AI is currently in <strong>pilot phase</strong> and actively improving. 
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
              If you'd like to provide feedback, please use our feedback form at:
            </Typography>
            <Box sx={{ 
              backgroundColor: "#282C34",
              color: "white",
              p: 2,
              borderRadius: 1,
              textAlign: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#1f2328"
              }
            }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                👉 <strong>tradia.com.au/feedback</strong>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Simple Consent */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: "#282C34",
            fontSize: "1.1rem",
            mb: 3,
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{ marginRight: "8px" }}>✓</span>
            User Consent
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
            By using this platform, you agree to:
          </Typography>
          
          <Box sx={{ pl: 2 }}>
            {[
              "Avoid entering sensitive or private personal data",
              "Accept that results are informational, not legal or financial advice",
              "Take full responsibility for actions taken based on Tradia AI outputs"
            ].map((item, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                <Typography sx={{ color: "#282C34", mr: 2, fontSize: "1.2rem" }}>•</Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6, flex: 1 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        p: 4, 
        borderTop: `1px solid ${theme.palette.divider}`,
      }}>
        <Button 
          onClick={() => onClose(true)} // Pass true to indicate agreement
          variant="contained" 
          size="large"
          sx={{ 
            backgroundColor: "#4280EF",
            px: 6,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#0d58de",
            }
          }}
        >
          I Understand & Agree
        </Button>
      </DialogActions>
    </Dialog>
  )

  const BrandingSection = () => (
    <Box
      sx={{
        flex: 1,
        bgcolor: "#282C34",
        display: isSmallScreen ? "none" : "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
        color: "#fff",
        position: "relative",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { md: "3rem", lg: "3.5rem" },
            fontFamily: "IBM Plex Mono, monospace",
            mb: 2,
          }}
        >
          Tradia AI
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Roboto, sans-serif",
            color: "#d1d5db",
            fontWeight: "400",
          }}
        >
          AI-powered Chatbot
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "4px",
          display: "flex",
          gap: 0,
          boxShadow: "none",
          border: "none",
        }}
      >
        <Box
          component="button"
          onClick={() => handleThemeChange(null, "light")}
          sx={{
            px: 2.5,
            py: 0.8,
            borderRadius: "16px",
            border: "none",
            backgroundColor: !darkMode ? "#20438F" : "transparent",
            color: !darkMode ? "#ffffff" : "#6b7280",
            fontSize: "0.8rem",
            fontWeight: 500,
            fontFamily: "inherit",
            cursor: "pointer",
            transition: "all 0.2s ease",
            minWidth: "auto",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
            "&:hover": {
              backgroundColor: !darkMode ? "#3366cc" : "rgba(107, 114, 128, 0.1)",
            },
          }}
        >
          Light mode
        </Box>
        <Box
          component="button"
          onClick={() => handleThemeChange(null, "dark")}
          sx={{
            px: 2.5,
            py: 0.8,
            borderRadius: "16px",
            border: "none",
            backgroundColor: darkMode ? "#4280EF" : "transparent",
            color: darkMode ? "#ffffff" : "#6b7280",
            fontSize: "0.8rem",
            fontWeight: 500,
            fontFamily: "inherit",
            cursor: "pointer",
            transition: "all 0.2s ease",
            minWidth: "auto",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
            "&:hover": {
              backgroundColor: darkMode ? "#3366cc" : "rgba(107, 114, 128, 0.1)",
            },
          }}
        >
          Dark mode
        </Box>
      </Box>
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Branding on Left for Signup */}
        <BrandingSection />

        {/* Signup Form on Right */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: isSmallScreen ? 3 : 0,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Container
            sx={{
              width: "100%",
              border: isSmallScreen ? "none" : "2px solid #33363F",
              borderLeft: isSmallScreen ? "none" : "0px",
              borderRadius: isSmallScreen ? "0px" : "0px 16px 16px 0px",
              margin: isSmallScreen ? 0 : "60px 40px 60px 0",
              p: 3,
              backgroundColor: theme.palette.background.paper,
              transform: "translateX(0)",
              opacity: 1,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Box sx={{ maxWidth: 340, mx: "auto" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Button
                  onClick={onBackToLogin}
                  sx={{
                    minWidth: "auto",
                    p: 0.5,
                    mr: 1,
                    color: theme.palette.text.secondary,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <div>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      fontSize: { xs: "1.5rem", sm: "1.75rem" },
                    }}
                  >
                    Sign Up
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: "0.85rem",
                    }}
                  >
                    Join us today and get started
                  </Typography>
                </div>
              </Box>

              {/* <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <img src={googleIconclr || "/placeholder.svg"} alt="Google" style={{ width: 18, height: 18 }} />
                }
                sx={{
                  mb: 2,
                  py: 1.2,
                  fontSize: "0.85rem",
                }}
              >
                Sign up with Google
              </Button> */}

              {/* <Divider
                sx={{
                  mb: 2.5,
                  color: theme.palette.text.secondary,
                  fontSize: "0.8rem",
                }}
              >
                or
              </Divider> */}

              <Box component="form" onSubmit={handleSubmit}>

                                <div style={{ marginBottom: "14px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      color: theme.palette.text.secondary,
                      fontSize: "0.8rem",
                    }}
                  >
                    Full name<span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={signUpFullname}
                    onChange={(e) => setSignUpFullname(e.target.value)}
                    placeholder="Full Name"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: darkMode ? "transparent" : "#ffffff",
                      color: theme.palette.text.primary,
                      fontSize: "0.8rem",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.palette.primary.main)}
                    onBlur={(e) => (e.target.style.borderColor = theme.palette.divider)}
                  />
                </div>

                                  <div style={{ marginBottom: "14px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      color: theme.palette.text.secondary,
                      fontSize: "0.8rem",
                    }}
                  >
                    Username: <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={SignUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    placeholder="Username"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: darkMode ? "transparent" : "#ffffff",
                      color: theme.palette.text.primary,
                      fontSize: "0.8rem",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.palette.primary.main)}
                    onBlur={(e) => (e.target.style.borderColor = theme.palette.divider)}
                  />
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      color: theme.palette.text.secondary,
                      fontSize: "0.8rem",
                    }}
                  >
                    Email<span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: darkMode ? "transparent" : "#ffffff",
                      color: theme.palette.text.primary,
                      fontSize: "0.8rem",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.palette.primary.main)}
                    onBlur={(e) => (e.target.style.borderColor = theme.palette.divider)}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      color: theme.palette.text.secondary,
                      fontSize: "0.8rem",
                    }}
                  >
                    Password<span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: darkMode ? "transparent" : "#ffffff",
                      color: theme.palette.text.primary,
                      fontSize: "0.8rem",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.palette.primary.main)}
                    onBlur={(e) => (e.target.style.borderColor = theme.palette.divider)}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      color: theme.palette.text.secondary,
                      fontSize: "0.8rem",
                    }}
                  >
                    Confirm Password<span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: `1px solid ${!passwordsMatch && confirmPassword ? "#ef4444" : theme.palette.divider}`,
                      backgroundColor: darkMode ? "transparent" : "#ffffff",
                      color: theme.palette.text.primary,
                      fontSize: "0.8rem",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = theme.palette.primary.main)}
                    onBlur={(e) =>
                      (e.target.style.borderColor =
                        !passwordsMatch && confirmPassword ? "#ef4444" : theme.palette.divider)
                    }
                  />
                  {!passwordsMatch && confirmPassword && (
                    <div
                      style={{
                        color: "#ef4444",
                        fontSize: "0.75rem",
                        marginTop: "4px",
                      }}
                    >
                      Passwords do not match
                    </div>
                  )}
                </div>

                <Box sx={{ mb: 2.5 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        size="small"
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "0.8rem",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        Agree with{" "}
                        <Link
                          component="button"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            setShowTermsModal(true)
                          }}
                          sx={{
                            color: "#4280EF",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          Terms of Use
                        </Link>
                      </Typography>
                    }
                  />
                </Box>

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  disabled={!agreeToTerms}
                  sx={{
                    mb: 2.5,
                    py: 1.2,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    backgroundColor: "#20438F",
                  }}

                  onClick={async () => {
                    const formData = {
                      full_name: signUpFullname,
                      email: signUpEmail,
                      password: signUpPassword,
                      username: SignUpUsername
                    };
                    let response = null;
                    try {
                      const response = await AuthAPI.register(JSON.stringify(formData));
                      console.log('Registration successful:', response);
                      if(response?.success){
                        alert(response.message);
                        onBackToLogin();
                      }
                      //this is the response from the backend
                      // {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGVpcmZhbnVsbGFoIiwiZXhwIjoxNzU2MzkyOTk2LCJ0eXBlIjoiYWNjZXNzIn0.t0HbO2TUJ_gUBoHpQfrJLyy18-ZnokXRnm8lWdDmPNY","refresh_token":"Y7VOKT98isMaQN9B-RlmIXbiQV2ZER_t80ieURaKZh0","token_type":"bearer","expires_in":1800}
                      
                      // store it in session storage
 
                    } catch (error) {
                      console.error('Registration failed:', error.response.data);
                      alert(error.response.data.detail || 'Registration failed. Please try again.');
                      // Handle registration errors (e.g., show error message)
                    }
                  }}
                >
                  Create Account
                </Button>

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: theme.palette.text.secondary,
                    fontSize: "0.8rem",
                  }}
                >
                  Already have an account?{" "}
                  <Button
                    variant="text"
                    size="small"
                    onClick={onBackToLogin}
                    sx={{
                      color: "#4280EF",
                      textTransform: "none",
                      p: 0,
                      minWidth: "auto",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                    }}
                  >
                    Sign in
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <TermsOfUseModal open={showTermsModal} onClose={handleModalClose} />
    </ThemeProvider>
  )
}

export default SignupPage