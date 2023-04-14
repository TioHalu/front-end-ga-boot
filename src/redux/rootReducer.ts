import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/component/pages/Login/reducer";
import base from "@/component/layouts/base/slice";
import member from "@/component/pages/Member/reducer";
const rootReducer = {
  authLogin: authSlice,
  base: base,
  member: member,
};

export default combineReducers(rootReducer);