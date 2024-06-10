// src/features/questions/questionsApi.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await axios.get('http://localhost:5000/questions');
  return response.data;
});
