import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userListings: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setListings: (state, action) => {
      return { ...state, userListings: action.payload };
    },
  },
});

export default profileSlice.reducer;
export const { setListings } = profileSlice.actions;
