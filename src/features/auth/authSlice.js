import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("woodenCraftUser");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    register: (state, action) => {
      const user = action.payload;

      localStorage.setItem("woodenCraftUser", JSON.stringify(user));
    },

    login: (state, action) => {
      const user = action.payload;

      localStorage.setItem("woodenCraftUser", JSON.stringify(user));

      state.user = user;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      localStorage.removeItem("woodenCraftUser");

      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;
