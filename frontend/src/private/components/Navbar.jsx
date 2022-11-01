import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Settings from "@mui/icons-material/Settings";
import Key from "@mui/icons-material/Key";
import Logout from "@mui/icons-material/Logout";

import alertify from "alertifyjs";

import { useAuth } from "../../hooks";
import { Link } from "@mui/material";

export function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { user, logout } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    alertify.confirm(
      "Logout",
      "¿Are you sure to logout?",
      function () {
        logout();
      },
      function () {
        return;
      }
    );
  };

  return (
    <>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0, paddingY: 4 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                App roles and permissions
              </Typography>
            </Grid>
            <Grid item>
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  variant="contained"
                  sx={{ color: "#fff", border: 1 }}
                >
                  {user.name}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ marginRight: 1 }}>Logout</Typography>
                    <Logout />
                  </MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

Navbar.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};
