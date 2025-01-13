// redux/reducers/index.js
import { combineReducers } from "redux";
import profileUpdateReducer from "../slices/authSlices/profileUpdateSlice";

const rootReducer = combineReducers({
  auth: profileUpdateReducer, // Store user data under 'auth' slice
});

export default rootReducer;
