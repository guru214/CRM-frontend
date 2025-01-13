import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
    "/api/v1/auth/register",
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post(
                "https://localhost:4000//api/v1/auth/register",
                credentials, {
                withCredentials: true,
            }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: 'An unexpected error occurred.' }
            );
        }
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        isLoading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetRegisterState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Registration failed.';
            });
    },
});

export const { resetRegisterState } = registerSlice.actions;

export default registerSlice.reducer;
