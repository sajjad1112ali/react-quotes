import React from "react";
import { Container, Box, Typography } from "@mui/material";

function Header() {
  return (
    <Container maxWidth="xl">
      <Box>
        <Typography sx={{ mt: 1.5 }} variant="h3">
          React + Socket.IO Chat App
        </Typography>
      </Box>
    </Container>
  );
}

export default Header;
