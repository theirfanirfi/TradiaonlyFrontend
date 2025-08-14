// import { Box } from '@mui/material';
// import DarkLogo from '../images/dark_logo.png';

// const Logo = () => {
//     return (
//         <Box p={2}>
//             <img
//                 src={DarkLogo}
//                 alt="Tradia AI Logo"
//                 style={{
//                     width: '100%',
//                     height: 'auto',
//                     objectFit: 'contain',
//                     borderRadius: '8px',
//                 }}
//             />
//         </Box>
//     );
// }

// export default Logo;

// components/Logo.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#4280EF",
          fontSize: "24px",
          letterSpacing: "-0.5px",
        }}
      >
        Tradia AI
      </Typography>
    </Box>
  );
};

export default Logo;
