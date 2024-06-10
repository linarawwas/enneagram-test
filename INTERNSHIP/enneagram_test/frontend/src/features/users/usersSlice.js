import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersApi";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    userMap: {}, // New: Store user details as an object for quick access by ID
    status: "idle",
    error: null,
  },
  reducers: {
    userUpdated(state, action) {
      const { id, name, email } = action.payload;
      state.userMap[id] = { ...state.userMap[id], name, email }; // Update user details
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = action.payload;
        state.userMap = action.payload.reduce((acc, user) => {
          acc[user.id] = user; // Map user details by ID
          return acc;
        }, {});
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { userUpdated } = usersSlice.actions;

export default usersSlice.reducer;
