import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for email verification
export const verifyEmail = createAsyncThunk(
  "api/v1/auth/verifyEmail",
  async (emailVerifyToken, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://localhost:4000//api/v1/auth/verifyEmail/${emailVerifyToken}`, {}, {
            withCredentials: true, // Ensure cookies are sent
          }
      );
      return response.data; // Assuming the backend returns success status
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Verification failed." }
      );
    }
  }
);

// Initial state
const initialState = {
  isLoading: false,
  isVerified: false,
  error: null,
};

// Slice
const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isVerified = false;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Verification failed.";
        state.isVerified = false;
      });
  },
});

export default verifyEmailSlice.reducer;
