import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthenticatedMe } from './authApi.js'; // Adjust import to match your structure

const initialState = {
  me: {
    id: null,
    name: "",
    email: "",
    isAdmin: false,
  },
  isAuthenticated: false,
  isSignIn: true,
  isFetching: false, // Add fetching state
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
      localStorage.setItem("token", null);
    },
    toggleAuthForm(state) {
      state.isSignIn = !state.isSignIn;
    },
    setSignIn(state, action) {
      state.isSignIn = action.payload;
    },
    checkAuthToken(state) {
      const token = localStorage.getItem("token");
      state.isAuthenticated = token !== null && token !== 'null';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthenticatedMe.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchAuthenticatedMe.fulfilled, (state, action) => {
        state.me = action.payload;
        state.isAuthenticated = true;
        state.isFetching = false;
      })
      .addCase(fetchAuthenticatedMe.rejected, (state) => {
        state.isAuthenticated = false;
        state.isFetching = false;
      });
  },
});

export const { setMe, clearMe, toggleAuthForm, setSignIn, checkAuthToken } = authSlice.actions;
export default authSlice.reducer;
