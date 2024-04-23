// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  isAuthenticated: false,
  isLoading: false, // Add isLoading state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoading = true;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginSuccess(state) {
      state.isLoading = false;
    },
    loginFail(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.isLoading = true; // Set loading state to true when logging out
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false; // Set loading state back to false after logout
    },
  },
});

export const {
  login,
  logout,
  loginSuccess,
  loginFail,
} = authSlice.actions;
export default authSlice.reducer;

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:3001/user/login",
      userData
    );
    const data = await response.data;
    dispatch(login(data));
    localStorage.setItem("loginToken", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(loginSuccess());
  } catch (error) {
    console.error("Login failed", error);
    dispatch(loginFail());
  }
};



