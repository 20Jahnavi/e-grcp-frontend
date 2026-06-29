import { configureStore } from "@reduxjs/toolkit";
import vendorReducer
from "./slices/vendorSlice";
const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    vendors: vendorReducer,
    app: dummyReducer
  }
});