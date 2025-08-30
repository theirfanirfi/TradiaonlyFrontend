// components/Sidebar.js
import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({
  theme,
  isMobile,
  mobileOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  let user_fullname = sessionStorage.getItem("full_name") || "User";
  let user_fullnameFirstChar = user_fullname.charAt(0).toUpperCase();
  const SidebarContent = () => (
    <Box sx={{ color: theme.palette.text.sidebarPrimary }}>
      <Logo />

      <Button
        variant="contained"
        startIcon={<AddIcon sx={{ color: "white" }} />}
        onClick={()=> navigate("/processes")}
        sx={{
          mb: 1.5,
          textTransform: "none",
          fontWeight: "bold",
          backgroundColor: "#20438F",
          color: "white",
          borderRadius: "8px",
          py: 1.5,
          justifyContent: "flex-start",
          "&:hover": {
            backgroundColor: "#3366cc",
          },
        }}
      >
        Start new Process
      </Button>

      <List sx={{ px: 0, mt: 1 }}>
        <Link to="/processes" style={{ textDecoration: 'none' }}>
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
              color: theme.palette.text.sidebarSecondary,
              fontSize: "20px",
            }}
          />
          <ListItemText
            primary="Processes"
          onClick={(item) => {console.log(item);}}
            sx={{
              "& .MuiListItemText-primary": {
                color: theme.palette.text.sidebarPrimary,
                fontWeight: 500,
                fontSize: "0.9rem",
              },
            }}
          />
        </ListItem>
        </Link>
      </List>

      <Box sx={{ mt: "auto", pt: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            textTransform: "none",
            justifyContent: "space-between",
            borderColor:
              theme.palette.mode === "light" ? "#4B5563" : "#4B5563",
            color: theme.palette.text.sidebarPrimary,
            "&:hover": {
              borderColor:
                theme.palette.mode === "light" ? "#6B7280" : "#6B7280",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.05)"
                  : "rgba(255,255,255,0.1)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: "#4280EF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1,
                fontSize: "0.75rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {user_fullnameFirstChar}
            </Box>
            {user_fullname}
          </Box>
        </Button>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.sidebarPrimary,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <SidebarContent />
        </Box>
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        width: 280,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.sidebarPrimary,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        p: 3,
        borderRight: `1px solid ${
          theme.palette.mode === "light" ? "#4B5563" : "#4B5563"
        }`,
      }}
    >
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;