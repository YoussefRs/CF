import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("loginToken");
const initialState = {
  bookings: [],
  isLoading: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    createBooking(state) {
      state.isLoading = true;
    },
    createBookingSuccess(state, action) {
      state.isLoading = false;
      state.bookings.push(action.payload);
    },
    createBookingFail(state) {
      state.isLoading = false;
    },

    fetchBookings(state) {
      state.isLoading = true;
    },
    fetchBookingsSuccess(state, action) {
      state.isLoading = false;
      state.bookings = action.payload;
    },
    fetchBookingsFail(state) {
      state.isLoading = false;
    },
  },
});

export const {
  fetchBookings,
  fetchBookingsSuccess,
  fetchBookingsFail,
  createBooking,
  createBookingSuccess,
  createBookingFail,
} = bookingSlice.actions;

export default bookingSlice.reducer;

export const createNewBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch(createBooking());
    const response = await axios.post(
      `${BASE_URL}/user/reservations/createOrder`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    dispatch(createBookingSuccess(data));
  } catch (error) {
    console.error("createNewBooking failed", error);
    dispatch(createBookingFail());
  }
};

export const getAllBookings = () => async (dispatch) => {
  try {
    dispatch(fetchBookings());
    const response = await axios.get(`${BASE_URL}/user/orders/Getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    dispatch(fetchBookingsSuccess(data));
  } catch (error) {
    console.error("fetchApartments failed", error);
    dispatch(fetchBookingsFail());
  }
};

export const getUserBookings = () => async (dispatch) => {
  try {
    dispatch(fetchBookings());
    const response = await axios.get(`${BASE_URL}/user/orders/myorders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    dispatch(fetchBookingsSuccess(data));
  } catch (error) {
    console.error("fetchApartments failed", error);
    dispatch(fetchBookingsFail());
  }
};

export const adminAcceptOrder = (orderId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/order/accept/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getOneBooking = (id) => async (dispatch) => {
  try {
    dispatch(fetchBookings());
    const response = await axios.get(`${BASE_URL}/user/getOneOrder/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    dispatch(fetchBookingsSuccess(data));
  } catch (error) {
    console.log(error);
  }
};
