import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "/api/v1/auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://localhost:4000//api/v1/auth/login",
        credentials,
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      return response.data; // Assuming the backend returns user data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "An unexpected error occurred." }
      );
    }
  }
);


// Initial state
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

// Login slice
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login actions
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed.";
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
