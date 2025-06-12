import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              flexGrow: 1,
            }}
          >
            Workshop
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={RouterLink}
              to="/posts"
              color={isActive("/posts") ? "primary" : "inherit"}
              sx={{
                fontWeight: isActive("/posts") ? "bold" : "normal",
                textTransform: "none",
                fontSize: isMobile ? "0.875rem" : "1rem",
              }}
            >
              Posts
            </Button>
            <Button
              component={RouterLink}
              to="/ai-search"
              color={isActive("/ai-search") ? "primary" : "inherit"}
              sx={{
                fontWeight: isActive("/ai-search") ? "bold" : "normal",
                textTransform: "none",
                fontSize: isMobile ? "0.875rem" : "1rem",
              }}
            >
              AI Search
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
