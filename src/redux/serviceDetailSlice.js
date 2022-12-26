import { createSlice } from "@reduxjs/toolkit";

const serviceDetailSlice = createSlice({
  name: "serviceDetail",
  initialState: {
    service: {},
  },
  reducers: {
    fetchServiceDetail: (state, action) => {
      state.service = action.payload.data;
    },
  },
});

export const { fetchServiceDetail } = serviceDetailSlice.actions;

export default serviceDetailSlice.reducer;
