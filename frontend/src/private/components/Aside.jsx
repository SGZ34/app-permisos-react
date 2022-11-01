import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Person from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CookieIcon from "@mui/icons-material/Cookie";
import ContactMail from "@mui/icons-material/ContactMail";
import Home from "@mui/icons-material/Home";
import { useAuth } from "../../hooks";

const categories = [
  {
    id: "Users",
    icon: <Person />,
    path: "/app/users",
    permission: "/users",
  },
  {
    id: "Roles",
    icon: <ManageAccountsIcon />,
    path: "/app/roles",
    permission: "/roles",
  },
  {
    id: "Messages",
    icon: <ContactMail />,
    path: "/app/messages",
    permission: "/contact",
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export function Aside(props) {
  const { ...other } = props;

  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 15, color: "#fff" }}
        >
          <Link
            variant="p"
            component={RouterLink}
            sx={{
              color: "#fff",
              textDecoration: "none",

              "&:hover": { color: "#fff" },
            }}
            to="/app"
          >
            <Typography
              variant="span"
              component="span"
              sx={{ marginRight: 1, textAlign: "center" }}
            >
              App roles and permissions
            </Typography>
          </Link>
        </ListItem>

        <Box sx={{ bgcolor: "#101F33" }}>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} sx={item} to="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
        </Box>

        {categories.map(({ id, icon, path, permission }) => {
          if (!user.permisos.includes(permission)) {
            return null;
          }
          return (
            <Box key={id} sx={{ bgcolor: "#101F33" }}>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  selected={
                    path.startsWith(pathname) && pathname !== "/app"
                      ? true
                      : false
                  }
                  sx={item}
                  to={path}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{id}</ListItemText>
                </ListItemButton>
              </ListItem>
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
}
