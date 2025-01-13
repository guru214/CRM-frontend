// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunks for login and registration
// export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
//   try {
//     const response = await axios.post("/api/login", credentials, {
//       withCredentials: true, // Send cookies
//     });
//     return response.data.user; // Assuming the backend returns user data
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.message);
//   }
// });

// export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
//   try {
//     const response = await axios.post("/api/register", userData, {
//       withCredentials: true, // Send cookies
//     });
//     return response.data.user; // Assuming the backend returns user data
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.message);
//   }
// });

// // Initial state
// const initialState = {
//   user: null,
//   isLoading: false,
//   error: null,
// };

// // Auth slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login actions
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Register actions
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
