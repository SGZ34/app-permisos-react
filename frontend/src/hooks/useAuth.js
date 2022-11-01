import { useDispatch, useSelector } from "react-redux";
import { api } from "../api";
import { onChecking, onLogin, onLogout } from "../store";
import { useMessage } from "./useMessage";
export const useAuth = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { setErrorMessage } = useMessage();
  const startRegister = async ({ name, email, password, confirmPassword }) => {
    dispatch(onChecking());

    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout());
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  const startLogin = async (values) => {
    dispatch(onChecking());

    try {
      const { data } = await api.post("/auth/login", values);

      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout());
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  const renewToken = async () => {
    dispatch(onChecking());

    try {
      const res = await api.get("/auth/renew");
      if (res.status === 204) return dispatch(onLogout());

      dispatch(onLogin(res.data.user));
    } catch (error) {
      dispatch(onLogout());
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      dispatch(onLogout());
    } catch (error) {
      dispatch(onLogout());
    }
  };

  return {
    ...user,

    startRegister,
    startLogin,
    renewToken,
    logout,
  };
};
