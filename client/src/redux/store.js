
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from "./usersSlice"
import apartmentsReducer from "./apartmentSlice"
import BookingReducer from './BookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    apartments: apartmentsReducer,
    bookings: BookingReducer,
  },
});

export default store;
