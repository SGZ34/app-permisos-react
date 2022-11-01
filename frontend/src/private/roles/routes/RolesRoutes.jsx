import { Routes, Route } from "react-router-dom";
import { RolesProvider } from "../../../contexts";
import { Create, List } from "../pages";
export const RolesRoutes = () => {
  return (
    <RolesProvider>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="create" element={<Create />} />
      </Routes>
    </RolesProvider>
  );
};
