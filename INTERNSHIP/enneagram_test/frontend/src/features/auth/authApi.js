import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setMe, clearMe } from "./authSlice"; // Adjust import to match your structure

export const fetchAuthenticatedMe = createAsyncThunk(
  "auth/fetchAuthenticatedMe",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue('No token found');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("http://localhost:5000/users/me", config);
      dispatch(setMe(response.data));
      return response.data;
    } catch (error) {
      dispatch(clearMe());
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
