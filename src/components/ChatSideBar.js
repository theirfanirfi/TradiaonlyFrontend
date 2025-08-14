import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BusinessIcon from "@mui/icons-material/Business";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import BaseSidebar from "./BaseSideBar";

const ChatSidebar = ({
  theme,
  mobileOpen,
  onClose,
  isMobile,
  chatHistory,
  chatId,
  showIndustriesSubmenu,
  setShowIndustriesSubmenu,
  selectedIndustry,
  setSelectedIndustry,
  setMessage,
  navigate,
  showTradiaToolsSubmenu,
  setShowTradiaToolsSubmenu,
}) => (
  <BaseSidebar
    theme={theme}
    mobileOpen={mobileOpen}
    onClose={onClose}
    isMobile={isMobile}
    chatHistory={chatHistory}
    chatId={chatId}
    navigate={navigate}
    sx={{ height: "100vh", overflow: "hidden" }} // Ensure full height with no overflow
  >
    <List
      sx={{
        px: 0,
        mt: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ListItem
        button
        sx={{
          px: 1,
          py: 0.5,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.1)",
          },
        }}
      >
        <ChatOutlinedIcon
          sx={{
            mr: 2,
            color: "white",
            fontSize: "20px",
          }}
        />
        <ListItemText
          primary="AI chat"
          sx={{
            "& .MuiListItemText-primary": {
              color: "white",
              fontWeight: 500,
              fontSize: "0.9rem",
            },
          }}
        />
      </ListItem>
      <ListItem
        button
        sx={{
          px: 1,
          py: 0.5,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.1)",
          },
        }}
      >
        <RestoreOutlinedIcon
          sx={{
            mr: 2,
            color: "white",
            fontSize: "20px",
          }}
        />
        <ListItemText
          primary="History"
          sx={{
            "& .MuiListItemText-primary": {
              color: "white",
              fontWeight: 500,
              fontSize: "0.9rem",
            },
          }}
        />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setShowTradiaToolsSubmenu(!showTradiaToolsSubmenu);
          if (showIndustriesSubmenu) {
            setShowIndustriesSubmenu(false);
            setSelectedIndustry(null);
          }
        }}
        sx={{
          px: 1,
          py: 0.5,
          backgroundColor: showTradiaToolsSubmenu
            ? "rgba(66, 128, 239, 0.2)"
            : "transparent",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.1)",
          },
        }}
      >
        <PrecisionManufacturingIcon
          sx={{
            mr: 2,
            color: "white",
            fontSize: "20px",
          }}
        />
        <ListItemText
          primary="Tradia AI Tools"
          sx={{
            "& .MuiListItemText-primary": {
              color: "white",
              fontWeight: 500,
              fontSize: "0.9rem",
            },
          }}
        />
        <KeyboardArrowDownIcon
          sx={{
            transform: showTradiaToolsSubmenu
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          setShowIndustriesSubmenu(!showIndustriesSubmenu);
          if (showTradiaToolsSubmenu) {
            setShowTradiaToolsSubmenu(false);
          }
        }}
        sx={{
          px: 1,
          py: 0.5,
          backgroundColor: showIndustriesSubmenu
            ? "rgba(66, 128, 239, 0.2)"
            : "transparent",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.1)",
          },
        }}
      >
        <BusinessIcon
          sx={{
            mr: 2,
            color: "white",
            fontSize: "20px",
          }}
        />
        <ListItemText
          primary="Industries"
          sx={{
            "& .MuiListItemText-primary": {
              color: "white",
              fontWeight: 500,
              fontSize: "0.9rem",
            },
          }}
        />
        <KeyboardArrowDownIcon
          sx={{
            transform: showIndustriesSubmenu
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </ListItem>
      <ListItem
        button
        sx={{
          px: 1,
          py: 0.5,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.1)",
          },
        }}
      >
        <AutoAwesomeIcon
          sx={{
            mr: 2,
            color: "white",
            fontSize: "20px",
          }}
        />
        <ListItemText
          primary="Smart Prompt"
          sx={{
            "& .MuiListItemText-primary": {
              color: "white",
              fontWeight: 500,
              fontSize: "0.9rem",
              margin: 0,
              padding: 0,
            },
          }}
        />
      </ListItem>
    </List>
  </BaseSidebar>
);

export default ChatSidebar;
