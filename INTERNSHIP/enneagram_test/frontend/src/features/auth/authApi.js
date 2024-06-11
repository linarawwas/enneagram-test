import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setMe } from "./authSlice";

export const fetchAuthenticatedMe = createAsyncThunk(
  "auth/fetchAuthenticatedMe",
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the authorization header
        },
      };
      const response = await axios.get("http://localhost:5000/users/me", config); // Adjust the URL as needed
      dispatch(setMe(response.data)); // Dispatch setMe with the fetched data
      return response.data; // Pass the fetched data as the fulfilled action's payload
    } catch (error) {
      throw error;
    }
  }
);
