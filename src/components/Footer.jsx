import {
  Box,
  Typography,
} from "@mui/material";

function Footer() {

  return (

    <Box
      sx={{
        mt: 4,
        py: 2,
        textAlign: "center",
        borderTop: "1px solid #ccc",
      }}
    >

      <Typography variant="body2">

        © 2026 e-GRCP System |
        Built by Jahnavi

      </Typography>

    </Box>

  );
}

export default Footer;