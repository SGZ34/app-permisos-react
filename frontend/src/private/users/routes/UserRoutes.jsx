import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../../../contexts/UserContext";
import { Create, List } from "../pages";

export const UserRoutes = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </UserProvider>
  );
};
