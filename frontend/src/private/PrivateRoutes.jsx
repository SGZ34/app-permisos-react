import { Routes, Route } from "react-router-dom";

import { PrivateLayout } from "./Layout";
import { RolesRoutes } from "./roles";
import { UserRoutes } from "./users";
import { PrivateRoute } from "../router";
import { useAuth } from "../hooks";

export const PrivateRoutes = () => {
  const { user } = useAuth();
  const { permisos } = user;

  return (
    <PrivateLayout>
      <Routes>
        <Route path="/" element={<h1>Hola mundo</h1>} />
        <Route
          path="/users/*"
          element={
            <PrivateRoute isAllowed={permisos.includes("/users")}>
              <UserRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/roles/*"
          element={
            <PrivateRoute isAllowed={permisos.includes("/roles")}>
              <RolesRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/messages/*"
          element={
            <PrivateRoute isAllowed={permisos.includes("/contact")}>
              <h1>Messages</h1>
            </PrivateRoute>
          }
        />
      </Routes>
    </PrivateLayout>
  );
};
