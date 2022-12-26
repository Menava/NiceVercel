import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "inputedService",
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
