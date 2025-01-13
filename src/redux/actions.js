// redux/actions.js

export const updateUserProfile = (profileData) => {
    return {
      type: "UPDATE_USER_PROFILE",
      payload: profileData,
    };
  };
  