import { combineReducers } from "@reduxjs/toolkit";
import baseSlice from "../component/layouts/base/slice";
const rootReducer = {
  base: baseSlice,
};

export default combineReducers(rootReducer);