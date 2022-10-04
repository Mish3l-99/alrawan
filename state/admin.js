import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const adminSlice = createSlice({
  name: "admin",
  initialState: { value: initialState },
  reducers: {
    login: (state, action) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;

/* export your actions and your reducer */
