import { combineReducers } from "@reduxjs/toolkit";
import baseApi from "../api/baseApi";
import authSlice from "./authSlice";

const rootReducers = combineReducers({
  auth: authSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducers;
