// usersSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },
    getUsersFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getUsersRequest, getUsersSuccess, getUsersFailure } =
  usersSlice.actions;
export default usersSlice.reducer;

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersRequest());
    const response = await axios.get(`${BASE_URL}/user/`);
    const data = await response.data;
    dispatch(getUsersSuccess(data));
  } catch (error) {
    console.error("Failed to fetch users", error);
    dispatch(getUsersFailure(error.message));
  }
};
