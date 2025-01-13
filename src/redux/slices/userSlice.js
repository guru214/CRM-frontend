import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
      isLoggedIn: false,
      isEmailVerified: false,
      user: null,
    },
    reducers: {
      setUser: (state, action) => {
        state.isLoggedIn = true;
        state.isEmailVerified = action.payload.isEmailVerified;
        state.user = action.payload.user;
      },
      logout: (state) => {
        state.isLoggedIn = false;
        state.isEmailVerified = false;
        state.user = null;
      },
    },
  });
  
  export const { setUser, logout } = userSlice.actions;
  export default userSlice.reducer;
  