//userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, searchTerm, domains, genders, availability }) => {
    const response = await axios.get("http://localhost:3000/api/users", {
      params: {
        page,
        search: searchTerm,
        domain: domains.join(","),
        gender: genders.join(","),
        available: availability,
      },
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    totalPages: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUsers = (state) => state.users.users;
export const selectTotalPages = (state) => state.users.totalPages;

export default userSlice.reducer;
