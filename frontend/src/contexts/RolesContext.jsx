import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api";
import { useMessage } from "../hooks";

const RolesContext = createContext();

export const useRoles = () => {
  const context = useContext(RolesContext);
  return context;
};

export const RolesProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const { setSuccessMessage, setErrorMessage } = useMessage();

  const create = async (values) => {
    try {
      const res = await api.post("/roles/create", values);

      setRoles([...roles, { id: res.data.id, nombre: values.name }]);
      setSuccessMessage("Rol created successfully");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/roles");
      setRoles(data);
    })();
  }, []);

  return (
    <RolesContext.Provider value={{ roles, create }}>
      {children}
    </RolesContext.Provider>
  );
};
