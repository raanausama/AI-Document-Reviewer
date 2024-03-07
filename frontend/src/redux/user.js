import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  email: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateValue,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = initialStateValue;
    },
    setUserProfilePic: (state, action) => {
      state.user.profilePic = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserProfilePic } = userSlice.actions;

export default userSlice.reducer;
