import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/component/pages/Login/reducer";
import base from "@/component/layouts/base/slice";
const rootReducer = {
  authLogin: authSlice,
  base: base,
};

export default combineReducers(rootReducer);