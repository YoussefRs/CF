import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const initialState = {
  apartments: [],
  isLoading: false,
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    fetchApartments(state) {
      state.isLoading = true;
    },
    fetchApartmentsSuccess(state, action) {
      state.isLoading = false;
      state.apartments = action.payload;
    },
    fetchApartmentsFail(state) {
      state.isLoading = false;
    },
    deleteApartment(state, action) {
      state.isLoading = true;
    },
    deleteApartmentSuccess(state, action) {
      state.isLoading = false;
      state.apartments = state.apartments.filter(
        (apartment) => apartment.id !== action.payload
      );
    },
    deleteApartmentFail(state) {
      state.isLoading = false;
    },
  },
});

export const {
  fetchApartments,
  fetchApartmentsSuccess,
  fetchApartmentsFail,
  deleteApartment,
  deleteApartmentSuccess,
  deleteApartmentFail,
} = apartmentsSlice.actions;

export default apartmentsSlice.reducer;

export const getAllApartments = () => async (dispatch) => {
  try {
    dispatch(fetchApartments());
    const response = await axios.get(`${BASE_URL}/appartments/getAllAppart`);
    const data = await response.data;
    dispatch(fetchApartmentsSuccess(data));
  } catch (error) {
    console.error("fetchApartments failed", error);
    dispatch(fetchApartmentsFail());
  }
};

export const deleteApartmentById = (id) => async (dispatch) => {
  try {
    dispatch(deleteApartment());
    await axios.delete(`${BASE_URL}/appartments/${id}`);
    dispatch(deleteApartmentSuccess(id));
    dispatch(getAllApartments())
  } catch (error) {
    console.error("deleteApartment failed", error);
    dispatch(deleteApartmentFail());
  }
};
