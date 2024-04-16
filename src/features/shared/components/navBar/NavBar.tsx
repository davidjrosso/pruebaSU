"use client"
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import React from "react";


export const NavBar = () => {
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SocialUp
          </Typography>
          
          <div>
            <Container maxWidth="xl">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={() => router.push("/pages/login")}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => router.push("/pages/register")}
                    >
                      Register
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
