import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://flat-for-rent-back.onrender.com";

export const fetchApartments = createAsyncThunk(
  "apartments/fetchApartments",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addApartment = createAsyncThunk(
  "apartments/addApartment",
  async (apartment, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, apartment);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApartment = createAsyncThunk(
  "apartments/updateApartment",
  async ({ id, ...apartment }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, apartment);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApartment = createAsyncThunk(
  "apartments/deleteApartment",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
