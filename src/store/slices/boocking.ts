import { createSlice } from "@reduxjs/toolkit";

interface boockingState  {
  isPopupOpen: boolean;
};

const initialState: boockingState = {
  isPopupOpen: false,
};

const boockingSlice = createSlice({
  name:"boocking",
  initialState,
  reducers: {
    openPopup: (state) => {
      state.isPopupOpen = true;
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
    },
  }
});

export const {openPopup, closePopup} = boockingSlice.actions;
export default boockingSlice.reducer;