import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthenticatedUser } from './authApi';

const initialState = {
  user: {
    id: null,
    name: '',
    email: '',
    isAdmin: false
  },
  isAuthenticated: localStorage.getItem('token') ? true : false,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = {
        id: null,
        name: '',
        email: '',
        isAdmin: false
      };
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthenticatedUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthenticatedUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Update user state with fetched user information
        state.isAuthenticated = true;
      })
      .addCase(fetchAuthenticatedUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
