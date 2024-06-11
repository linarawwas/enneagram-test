import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthenticatedMe } from "./authApi";

const initialState = {
  me: {
    id: null,
    name: "",
    email: "",
    isAdmin: false,
  },
  isAuthenticated: localStorage.getItem("token") ? true : false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMe(state, action) {
      state.me = action.payload;
      state.isAuthenticated = true;
    },
    clearMe(state) {
      state.me = {
        id: null,
        name: "",
        email: "",
        isAdmin: false,
      };
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthenticatedMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthenticatedMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.me = action.payload; // This line is optional now as setMe is already dispatched
        state.isAuthenticated = true;
      })
      .addCase(fetchAuthenticatedMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isAuthenticated = false;
      });
  },
});

export const { setMe, clearMe } = authSlice.actions;

export default authSlice.reducer;
