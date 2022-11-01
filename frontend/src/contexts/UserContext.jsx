import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";
import { useMessage } from "../hooks";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = ({ children }) => {
  const { setSuccessMessage, setErrorMessage } = useMessage();
  const [users, setUsers] = useState([]);

  const create = async (values) => {
    try {
      const { data } = await api.post("/users/create", values);
      setUsers([
        ...users,
        { name: values.name, email: values.email, rol: data.rolUser },
      ]);
      setSuccessMessage("User created successfully");
    } catch (error) {
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/users");
      setUsers(data);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ users, create }}>
      {children}
    </UserContext.Provider>
  );
};
