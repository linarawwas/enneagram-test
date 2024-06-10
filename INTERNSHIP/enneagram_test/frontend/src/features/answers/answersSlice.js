// src/features/answers/answersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchAnswers } from './answersApi';

const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.answers = action.payload;
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default answersSlice.reducer;
