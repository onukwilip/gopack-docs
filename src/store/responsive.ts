import { createSlice } from "@reduxjs/toolkit";
const initialState = { showMenu: false };

const responsiveSlice = createSlice({
  name: "responsive",
  initialState: initialState,
  reducers: {
    toogle: (state) => {
      state.showMenu = !state?.showMenu;
    },
  },
});

export default responsiveSlice;
