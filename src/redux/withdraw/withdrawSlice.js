import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Thunk to fetch withdrawal details
export const fetchWithdrawDetails = createAsyncThunk(
  "postWithdraw/fetchWithdrawDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://localhost:4000//api/v1/withdrawDetails",
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      return response.data.decryptedWithdrawData; // Assuming the backend returns decrypted data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "An unexpected error occurred." }
      );
    }
  }
);

// Thunk to submit withdrawal details
export const withdrawFunds = createAsyncThunk(
  "postWithdraw/withdrawFunds",
  async (withdrawDetails, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://localhost:4000//api/v1/withdraw",
        withdrawDetails,
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      return response.data; // Assuming the backend returns some data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "An unexpected error occurred." }
      );
    }
  }
);

// Thunk to update withdrawal details
export const updateWithdrawDetails = createAsyncThunk(
  "postWithdraw/updateWithdrawDetails",
  async (withdrawDetails, thunkAPI) => {
    try {
      const response = await axios.put(
        "https://localhost:4000//api/v1/withdrawDetails",
        withdrawDetails,
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      return response.data; // Assuming the backend returns updated data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "An unexpected error occurred." }
      );
    }
  }
);

const initialState = {
  account_holder_name: "",
  account_number: "",
  ifsc_code: "",
  bic_swift_code: "",
  branch: "",
  bank_account_currency: "",
  upi_address: "",
  btc_withdraw_address: "",
  eth_withdraw_address: "",
  netteller_address: "",
  status: 'idle',
  error: null,
};

const postWithdrawSlice = createSlice({
  name: "postWithdraw",
  initialState,
  reducers: {
    setPostWithdrawDetails: (state, action) => {
      Object.assign(state, action.payload); // Modify the draft state directly
    },
    resetPostWithdrawDetails: (state) => {
      Object.assign(state, initialState); // Modify the draft state directly
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWithdrawDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWithdrawDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload); // Modify the draft state directly
      })
      .addCase(fetchWithdrawDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error("Failed to fetch withdrawal details");
      })
      .addCase(withdrawFunds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(withdrawFunds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        toast.success("Withdrawal successful");
      })
      .addCase(withdrawFunds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error("Withdrawal failed");
      })
      .addCase(updateWithdrawDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateWithdrawDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload); // Modify the draft state directly
        toast.success("Update successful");
      })
      .addCase(updateWithdrawDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error("Update failed");
      });
  },
});

export const { setPostWithdrawDetails, resetPostWithdrawDetails } = postWithdrawSlice.actions;
export default postWithdrawSlice.reducer;