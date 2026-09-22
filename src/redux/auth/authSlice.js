import { createSlice } from "@reduxjs/toolkit";

const persistedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = persistedAuth ?? {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          token: state.token,
          isLoggedIn: state.isLoggedIn,
        })
      );
    },
    clearCredentials: (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
