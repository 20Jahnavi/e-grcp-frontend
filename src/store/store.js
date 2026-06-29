import { configureStore }
from "@reduxjs/toolkit";

import authReducer
from "./slices/authSlice";

import procurementReducer
from "./slices/procurementSlice";

import vendorReducer
from "../features/vendors/vendorSlice";

import dashboardReducer
from "../features/dashboard/dashboardSlice";

import riskReducer
from "../features/risk/riskSlice";

export const store =
  configureStore({

    reducer: {

      auth: authReducer,
      risk: riskReducer,

      procurement:
        procurementReducer,

      vendors:
        vendorReducer,

      dashboard:
        dashboardReducer,
    },
  });