export default function MobileSidebar (props) {
    let {mobileOpen, onClose} = props
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
              color: theme.palette.text.sidebarPrimary, // Use sidebarPrimary for text
            },
          }}
        >
          <Box sx={{ p: 3, color: theme.palette.text.sidebarPrimary }}>
            {children}
          </Box>
        </Drawer>
      );
}