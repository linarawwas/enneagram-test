// src/features/answers/answersApi.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAnswers = createAsyncThunk('answers/fetchAnswers', async () => {
  const response = await axios.get('http://localhost:5000/answers');
  return response.data;
});
