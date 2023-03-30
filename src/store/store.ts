import { configureStore } from "@reduxjs/toolkit";
import responsiveSlice from "./responsive";
import displaySlice from "./toogleDisplay";

const store = configureStore({
  reducer: {
    display: displaySlice.reducer,
    responsive: responsiveSlice.reducer,
  },
});

export default store;
export const displayActions = displaySlice.actions;
export const responsiveActions = responsiveSlice.actions;
