import { Routes, Route, Navigate } from "react-router-dom";
import { About, Contact, HomePage } from "./home";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthRoutes } from "./auth";
import { publicTheme } from "../themes";
import { PublicLayout } from "./Layout";
import { useAuth } from "../hooks";

export const PublicRoutes = () => {
  const { status } = useAuth();
  return (
    <ThemeProvider theme={publicTheme}>
      <CssBaseline />
      <PublicLayout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="auth/*"
            element={
              status === "not-auth" ? <AuthRoutes /> : <Navigate to="/app" />
            }
          />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </PublicLayout>
    </ThemeProvider>
  );
};
