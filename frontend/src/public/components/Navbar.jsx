import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";

const drawerWidth = 240;

export function Navbar(props) {
  const { status } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Permission's app
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding component={NavLink} to="/">
          <ListItemButton sx={{ textAlign: "center", color: "#000" }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={NavLink} to="/about">
          <ListItemButton sx={{ textAlign: "center", color: "#000" }}>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={NavLink} to="/contact">
          <ListItemButton sx={{ textAlign: "center", color: "#000" }}>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
        {status === "not-auth" ? (
          <>
            <ListItem
              sx={{ marginTop: 5 }}
              component={NavLink}
              to="/auth/login"
            >
              <ListItemButton sx={{ textAlign: "center", color: "#000" }}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={NavLink} to="/auth/register">
              <ListItemButton sx={{ textAlign: "center", color: "#000" }}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem
            disablePadding
            component={NavLink}
            to="/app"
            sx={{ marginTop: 5 }}
          >
            <ListItemButton sx={{ textAlign: "center", color: "#000" }}>
              <ListItemText primary="Ingresar al sistema" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }} component={NavLink} to="/">
              Home
            </Button>
            <Button sx={{ color: "#fff" }} component={NavLink} to="/about">
              About
            </Button>
            <Button sx={{ color: "#fff" }} component={NavLink} to="/contact">
              Contact
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {status === "not-auth" ? (
              <>
                <Button
                  sx={{
                    color: "#000",
                    background: "#fff",
                    marginRight: "10px",
                    "&:hover": { background: "#000", color: "#fff" },
                  }}
                  variant="contained"
                  component={NavLink}
                  to="/auth/login"
                >
                  Login
                </Button>
                <Button
                  sx={{
                    color: "#000",
                    background: "#fff",
                    marginRight: "10px",
                    "&:hover": { background: "#000", color: "#fff" },
                  }}
                  variant="contained"
                  component={NavLink}
                  to="/auth/register"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{
                    color: "#000",
                    background: "#fff",
                    marginRight: "10px",
                    "&:hover": { background: "#000", color: "#fff" },
                  }}
                  variant="contained"
                  component={NavLink}
                  to="/app"
                >
                  Ingresar al sistema
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
