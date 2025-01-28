import { createSlice } from "@reduxjs/toolkit";
import {
  addApartment,
  deleteApartment,
  fetchApartments,
  updateApartment,
} from "./apartmentOperations";

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState: {
    apartments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartments.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchApartments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apartments = action.payload;
      })
      .addCase(fetchApartments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addApartment.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(addApartment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apartments.push(action.payload);
      })
      .addCase(addApartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateApartment.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateApartment.fulfilled, (state, action) => {
        const index = state.apartments.findIndex(
          (apt) => apt.id === action.payload.id
        );
        if (index !== -1) {
          state.apartments[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(updateApartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteApartment.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.apartments = state.apartments.filter(
          (apt) => apt.id !== action.payload
        );
        state.status = "succeeded";
      })
      .addCase(deleteApartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllApartments = (state) => state.apartments.apartments;
export const selectApartmentById = (state, id) =>
  Array.isArray(state.apartments.apartments)
    ? state.apartments.apartments.find((apt) => apt.id === id)
    : undefined;

export default apartmentsSlice.reducer;
