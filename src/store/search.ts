import { createSlice } from "@reduxjs/toolkit";
const initialState = { searchWord: false };

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    searchHandler: (state, { payload }) => {
      state.searchWord = payload;
    },
  },
});

export default searchSlice;
