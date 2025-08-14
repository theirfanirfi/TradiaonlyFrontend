import { Box, List, ListItem, ListItemText, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const IndustryPromptsSubmenu = ({ theme, industry, prompts, onPromptSelect, onBack }) => (
  <Box
    sx={{
      width: 220,
      backgroundColor: theme.palette.mode === "light" ? "#4B5563" : "#2D3748",
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
        {industry}
      </Typography>
      <IconButton
        onClick={onBack}
        size="small"
        sx={{ color: theme.palette.text.sidebarPrimary, p: 0.5, "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
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
    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.sidebarSecondary }}>
      Suggested Prompts:
    </Typography>
    <List sx={{ px: 0 }}>
      {prompts.map((prompt, index) => (
        <ListItem
          key={index}
          button
          onClick={() => onPromptSelect(prompt)}
          sx={{ px: 1, py: 0.5, mb: 0.5, backgroundColor: "#ffffff", borderRadius: "6px", "&:hover": { backgroundColor: "rgb(203, 239, 245)" } }}
        >
          <ListItemText
            primary={prompt}
            sx={{ "& .MuiListItemText-primary": { color: "rgba(4, 25, 59)", fontSize: "0.8rem", lineHeight: 1.3 } }}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default IndustryPromptsSubmenu;