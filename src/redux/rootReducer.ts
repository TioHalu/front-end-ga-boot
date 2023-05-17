import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/component/pages/Login/reducer";
import base from "@/component/layouts/base/slice";
import member from "@/component/pages/Member/reducer";
import dashboard from "@/component/pages/Dashboard/reducer";
const rootReducer = {
  authLogin: authSlice,
  base: base,
  member: member,
  dashboard: dashboard,
};

export default combineReducers(rootReducer);