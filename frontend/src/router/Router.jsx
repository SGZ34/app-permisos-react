import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes } from "../public";
import { PrivateRoutes } from "../private";
import { useAuth } from "../hooks";

export const Router = () => {
  const { renewToken, status } = useAuth();
  useEffect(() => {
    renewToken();
  }, []);

  if (status === "checking") return <h1>Cargando...</h1>;
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route
        path="/app/*"
        element={
          status === "auth" ? <PrivateRoutes /> : <Navigate to="/auth/login" />
        }
      />
    </Routes>
  );
};
