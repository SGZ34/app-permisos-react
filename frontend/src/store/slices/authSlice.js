import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: "checking",
  user: undefined,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "auth";
      state.user = payload;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-auth";
      state.user = undefined;
    },
  },
});
export const { onChecking, onLogin, onLogout } = authSlice.actions;
