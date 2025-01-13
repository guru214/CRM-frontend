// store.js
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/authSlices/loginSlice.js";
import registerReducer from './slices/authSlices/registerSlice.js';
import userReducer from './slices/userSlice.js';
import postWithdrawReducer from './withdraw/withdrawSlice.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import verifyEmailReducer from './slices/authSlices/verifyEmailSlice.js'
const persistConfig = {
  key: 'root',
  storage,
};

const persistedLoginReducer = persistReducer(persistConfig, loginReducer);

const store = configureStore({
  reducer: {
    login: persistedLoginReducer,
    register: registerReducer,
    user: userReducer,
    postWithdraw: postWithdrawReducer,
 
    verifyEmail: verifyEmailReducer,
    },
});

export const persistor = persistStore(store);
export default store;
