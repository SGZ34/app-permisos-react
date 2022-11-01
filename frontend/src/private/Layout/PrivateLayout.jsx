import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Navbar, Aside } from "../components";
import { privateTheme } from "../../themes";
import { useMessage } from "../../hooks";
import alertify from "alertifyjs";
import { setTypeMessage } from "../../helpers";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {`Copyright © Auth with mern stack and roles/permissions ${new Date().getFullYear()}.`}
    </Typography>
  );
}

const drawerWidth = 256;

export function PrivateLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmUp = useMediaQuery(privateTheme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { text, type, clearAllMessage } = useMessage();

  useEffect(() => {
    if (!!text && !!type) {
      alertify.set("notifier", "position", "top-right");
      const showMessage = setTypeMessage(type, text);
      showMessage();
      clearAllMessage();
    }
  }, [text]);

  return (
    <ThemeProvider theme={privateTheme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Aside
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}

          <Aside
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Navbar onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            {children}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
