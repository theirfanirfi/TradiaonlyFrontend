"use client"

import { useState, useMemo, useCallback } from "react"
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
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import SignupPage from "./Pages/SignupPage"
import googleIconclr from "./images/googlelogo.png"
import Logo from "./components/Logo"

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

// Separate LoginForm component to prevent recreation
const LoginForm = ({ theme, isAnimating, darkMode, isSmallScreen, onSubmit, onCreateAccount }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    console.log({ email, password, keepLoggedIn })
    onSubmit(email, password)
  }, [email, password, keepLoggedIn, onSubmit])

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
    backgroundColor: darkMode ? "transparent" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    fontSize: "0.8rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  }

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    color: darkMode ? "#9ca3af" : "#666666",
    fontSize: "0.8rem",
  }

  return (
    <Container
      sx={{
        width: "100%",
        border: isSmallScreen ? "none" : "2px solid #33363F",
        borderRight: isSmallScreen ? "none" : "0px",
        borderRadius: isSmallScreen ? "0px" : "16px 0px 0px 16px",
        margin: isSmallScreen ? 0 : "60px 0 60px 40px",
        p: 3,
        backgroundColor: theme.palette.background.paper,
        transform: isAnimating ? "translateX(-50px)" : "translateX(0)",
        opacity: isAnimating ? 0 : 1,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Box sx={{ maxWidth: 340, mx: "auto" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: theme.palette.text.primary,
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
          }}
        >
          Log in
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: theme.palette.text.secondary,
            fontSize: "0.85rem",
          }}
        >
          Enter your email and password to log in
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<img src={googleIconclr || "/placeholder.svg"} alt="Google" style={{ width: 18, height: 18 }} />}
          sx={{
            mb: 2,
            py: 1.2,
            fontSize: "0.85rem",
          }}
        >
          Log in with Google
        </Button>

        <Divider
          sx={{
            mb: 2.5,
            color: theme.palette.text.secondary,
            fontSize: "0.8rem",
          }}
        >
          or
        </Divider>

        <Box component="form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>
              Email<span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#4280EF")}
              onBlur={(e) => (e.target.style.borderColor = darkMode ? "#4b5563" : "#d1d5db")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>
              Password<span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#4280EF")}
              onBlur={(e) => (e.target.style.borderColor = darkMode ? "#4b5563" : "#d1d5db")}
            />
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2.5,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox checked={keepLoggedIn} onChange={(e) => setKeepLoggedIn(e.target.checked)} size="small" />
              }
              label="Keep me logged in"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.8rem",
                  color: theme.palette.text.secondary,
                },
              }}
            />

            <Button
              variant="text"
              size="small"
              sx={{
                color: "#4280EF",
                fontSize: "0.8rem",
                textTransform: "none",
                p: 0,
                minWidth: "auto",
              }}
            >
              Forget password?
            </Button>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mb: 2.5,
              py: 1.2,
              fontSize: "0.85rem",
              fontWeight: 600,
              backgroundColor: "#20438F",
            }}
          >
            Sign in
          </Button>

          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              color: theme.palette.text.secondary,
              fontSize: "0.8rem",
            }}
          >
            Not registered yet?{" "}
            <Button
              variant="text"
              size="small"
              onClick={onCreateAccount}
              sx={{
                color: "#4280EF",
                textTransform: "none",
                p: 0,
                minWidth: "auto",
                fontSize: "0.8rem",
                fontWeight: 500,
              }}
            >
              Create an Account
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

const BrandingSection = ({ darkMode, isSmallScreen, onThemeChange }) => (
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
      <Logo />
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
        onClick={() => onThemeChange(null, "light")}
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
        onClick={() => onThemeChange(null, "dark")}
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

function Login() {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" ? sessionStorage.getItem("themeMode") === "dark" : true,
  )

  const [showSignup, setShowSignup] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Memoize theme to prevent recreation on every render
  const theme = useMemo(() => createTheme(getDesignTokens(darkMode ? "dark" : "light")), [darkMode])
  
  const muiTheme = useTheme()
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"))

  const navigate = useNavigate()

  const handleThemeChange = useCallback((event, newMode) => {
    if (newMode !== null) {
      setDarkMode(newMode === "dark")
      sessionStorage.setItem("themeMode", newMode)
    }
  }, [])

  const handleLogin = useCallback((email, password) => {
    if (email && password) {
      navigate("/main")
    }
  }, [navigate])

  const handleCreateAccount = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowSignup(true)
      setIsAnimating(false)
    }, 300)
  }, [])

  const handleBackToLogin = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowSignup(false)
      setIsAnimating(false)
    }, 300)
  }, [])

  if (showSignup) {
    return <SignupPage onBackToLogin={handleBackToLogin} />
  }

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
          <LoginForm 
            theme={theme}
            isAnimating={isAnimating}
            darkMode={darkMode}
            isSmallScreen={isSmallScreen}
            onSubmit={handleLogin}
            onCreateAccount={handleCreateAccount}
          />
        </Box>
        <BrandingSection 
          darkMode={darkMode}
          isSmallScreen={isSmallScreen}
          onThemeChange={handleThemeChange}
        />
      </Box>
    </ThemeProvider>
  )
}

export default Login