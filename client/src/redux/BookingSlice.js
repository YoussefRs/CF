import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
      `${BASE_URL}/reservations/add`,
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
    const response = await axios.get(`${BASE_URL}/reservations/`, {
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
    const response = await axios.put(
      `${BASE_URL}/reservations/${orderId}/approve`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(
      "Reservierung akzeptiert. Eine E-Mail wird versendet, um den Kunden zu benachrichtigen."
    );
  } catch (error) {
    toast.success(
      "Reservierung abgelehnt. Eine E-Mail wird versendet, um den Kunden zu benachrichtigen."
    );
  }
};

export const adminRejectOrder = (orderId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/reservations/${orderId}/decline`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getOneBooking = (id, userId) => async (dispatch) => {
  try {
    dispatch(fetchBookings());
    const response = await axios.get(
      `${BASE_URL}/reservations/${userId}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    dispatch(fetchBookingsSuccess(data));
  } catch (error) {
    console.log(error);
  }
};
