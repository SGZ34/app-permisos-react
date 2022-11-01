import axios from "axios";
import { getEnv } from "../helpers";

const { VITE_BACKEND_URL } = getEnv();

export const api = axios.create({
  baseURL: VITE_BACKEND_URL,
});
api.defaults.withCredentials = true;
