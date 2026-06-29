import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import requests from "../../mocks/requests.json";

export const fetchDashboardData =
  createAsyncThunk(
    "dashboard/fetchDashboardData",
    async () => {

      // Simulate API delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      return {
        totalRequests: requests.length,
        approvedRequests: requests.filter(
          (r) => r.status === "Approved"
        ).length,

        pendingRequests: requests.filter(
          (r) => r.status === "Pending"
        ).length,
      };
    }
  );

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    data: null,
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(
      fetchDashboardData.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      fetchDashboardData.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
      }
    );

  },
});

export default dashboardSlice.reducer;