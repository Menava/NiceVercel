import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    position: "",
    name: "",
  },
  reducers: {
    login: (state, action) => {
      const { name, username, position } = action.payload;
      if (username) {
        state.username = username;
        state.position = position;
        state.name = name;
      }
    },
    logout: (state) => {
      state.username = "";
      state.position = "";
      state.name = "";
    },
    alreadyLogin: (state, action) => {
      const { name, username, position } = action.payload;
      state.username = username;
      state.name = name;
      state.position = position;
    },
    withoutPermission: (state, action) => {
      const { navigate } = action.payload;
      navigate("/");
    },
  },
});

export const { login, logout, alreadyLogin, withoutPermission } =
  userSlice.actions;

export default userSlice.reducer;
