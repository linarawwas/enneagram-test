import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchAnswers = createAsyncThunk(
  "answers/fetchAnswers",
  async () => {
    const response = await axios.get("http://localhost:5000/answers");
    return response.data;
  }
);

export const postAnswers = createAsyncThunk(
  "answers/postAnswers",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/answers/many",
        payload
      );
      toast.success("Answers Recorded Successfully!"); // Display success toast
      return response.data;
    } catch (error) {
      toast.error("Failed to post answers."); // Display error toast
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
