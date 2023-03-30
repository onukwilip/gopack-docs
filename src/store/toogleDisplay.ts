import { createSlice } from "@reduxjs/toolkit";

const initialState: { display: "light" | "dark" } = {
  display: "light",
};

const displaySlice = createSlice({
  name: "display",
  initialState: initialState,
  reducers: {
    toogle: (state) => {
      if (state.display === "light") {
        state.display = "dark";
      } else {
        state.display = "light";
      }
    },
  },
});

export default displaySlice;
