import React from "react";
import {
 Box,
 Container,
 Divider,
 IconButton,
 Link,
 Tooltip,
 Typography,
} from "@mui/material";
import {
 Contacts,
 Instagram,
 PlaylistAddCheckCircle,
 WhatsApp,
} from "@mui/icons-material";

export default function FooterAdmin() {
 const footerStyle = {
    backgroundColor: "#3f51b5",
    paddingTop: "20px",
    paddingBottom: "20px",
 };

 return (
    <footer className="block py-4" style={footerStyle}>
      <Container maxWidth="lg">
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between", }}>
          <Typography
            variant="body2"
            color="textSecondary"
            fontWeight="bold"
            sx={{ py: 1, margin: "20px" }}
          >
            Copyright © {new Date().getFullYear()}{" "}
            <Link
              href="https://"
              color="textSecondary"
              underline="hover"
              variant="body2"
              sx={{ fontWeight: "bold", py: 1 }}
            >
              Social Up
            </Link>
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="contacts" arrow>
              <IconButton href="https://" >
                <Contacts />
              </IconButton>
            </Tooltip>
            <Tooltip title="whatsapp" arrow>
              <IconButton href="https://" >
                <WhatsApp />
              </IconButton>
            </Tooltip>
            <Tooltip title="Instagram" arrow>
              <IconButton
                href="https://www.instagram.com/socialup.ok/"
                
              >
                <Instagram />
              </IconButton>
            </Tooltip>
            <Tooltip title="License" arrow>
              <IconButton href="https://" >
                <PlaylistAddCheckCircle />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </footer>
 );
}