import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "./toogleDisplay";

const store = configureStore({
  reducer: {
    display: displaySlice.reducer,
  },
});

export default store;
export const displayActions = displaySlice.actions;
