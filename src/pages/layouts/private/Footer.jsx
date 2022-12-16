import React from "react";
import { Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Container maxWidth={false} className="footer">
      <Typography sx={{ mt: 1.5 }}>	&#169; 2022 Blog Buster, All rights reserved</Typography>
    </Container>
  );
}

export default Footer;
