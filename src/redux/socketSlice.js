import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socketSlice = createSlice({
  name: "socketSlice",
  initialState: {
    // socket: io(""),
    socketItems: [],
  },
  reducers: {
    setSocketItems: (state, action) => {
      const { data } = action.payload;
      console.log("sokcetData", data);
    },
  },
});

export const { setSocketItems } = socketSlice.actions;

export default socketSlice.reducer;
