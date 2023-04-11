import { configureStore } from "@reduxjs/toolkit";
import responsiveSlice from "./responsive";
import displaySlice from "./toogleDisplay";
import searchSlice from "./search";

const store = configureStore({
  reducer: {
    display: displaySlice.reducer,
    responsive: responsiveSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
export const displayActions = displaySlice.actions;
export const responsiveActions = responsiveSlice.actions;
export const searchActions = searchSlice.actions;
