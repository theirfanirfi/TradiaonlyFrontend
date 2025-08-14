import { Box, List, ListItem, Typography, IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const IndustriesSubmenu = ({
  theme,
  industries,
  selectedIndustry,
  onIndustrySelect,
  onClose,
}) => (
  <Box
    sx={{
      width: 200,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.sidebarPrimary,
      display: { xs: "none", md: "flex" },
      flexDirection: "column",
      p: 3,
      borderRight: `1px solid ${theme.palette.mode === "light" ? "#4B5563" : "#4B5563"}`,
      transition: "all 0.3s ease",
      position: "relative",
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      <EditIcon fontSize="small" />
      <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.text.sidebarPrimary }}>
        Industries
      </Typography>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          backgroundColor: "transparent",
          color: theme.palette.text.sidebarPrimary,
          p: 0.5,
          "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </IconButton>
    </Box>
    <List sx={{ px: 0 }}>
      {industries.map((industry) => (
        <ListItem
          key={industry}
          button
          onClick={() => onIndustrySelect(industry)}
          sx={{
            px: 1,
            py: 0.5,
            mb: 0.5,
            backgroundColor: selectedIndustry === industry ? "rgba(66, 128, 239, 0.3)" : "transparent",
            borderRadius: "6px",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          <Chip
            label={industry}
            size="small"
            sx={{
              backgroundColor: selectedIndustry === industry ? theme.palette.primary.main : "#ffffff",
              color: "rgba(3, 6, 12)",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"}`,
              fontSize: "0.8rem",
            }}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default IndustriesSubmenu;