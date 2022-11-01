import { configureStore } from "@reduxjs/toolkit";
import { authSlice, messageSlice } from "./slices";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    message: messageSlice.reducer,
  },
});
