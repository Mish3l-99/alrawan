import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const programSlice = createSlice({
  name: "gProgram",
  initialState: { value: initialState },
  reducers: {
    setGProgram: (state, action) => {
      state.value = action.payload;
    },
    resetGProgram: (state, action) => {
      state.value = initialState;
    },
  },
});

export const { setGProgram, resetGProgram } = programSlice.actions;
export default programSlice.reducer;

/* export your actions and your reducer */
