import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  user: any | null;
  accessToken: string | null;
};

const initialState: TInitialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
