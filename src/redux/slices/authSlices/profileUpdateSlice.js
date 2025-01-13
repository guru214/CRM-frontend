// redux/reducer.js

const initialState = {
    user: null, // Holds the user's profile data
  };
  
  const profileUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_USER_PROFILE":
        return {
          ...state,
          user: action.payload, // Update user profile data in state
        };
      default:
        return state;
    }
  };
  
  export default profileUpdateReducer;
  