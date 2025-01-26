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
      .addCase(addApartment.fulfilled, (state, action) => {
        state.apartments.push(action.payload);
      })
      .addCase(updateApartment.fulfilled, (state, action) => {
        const index = state.apartments.findIndex(
          (apt) => apt.id === action.payload.id
        );
        if (index !== -1) {
          state.apartments[index] = action.payload;
        }
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.apartments = state.apartments.filter(
          (apt) => apt.id !== action.payload
        );
      });
  },
});

export const selectAllApartments = (state) => state.apartments.apartments;
export const selectApartmentById = (state, id) =>
  state.apartments.apartments.find((apt) => apt.id === id);

export default apartmentsSlice.reducer;
