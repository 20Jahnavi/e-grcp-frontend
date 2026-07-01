import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import apiClient from "../../api/apiClient";

// FETCH REQUESTS
export const fetchRequests =
  createAsyncThunk(
    "procurement/fetchRequests",

    async () => {

      const response =
        await apiClient.get(
          "/products"
        );

      return response.data.products;
    }
  );

const procurementSlice =
  createSlice({

    name: "procurement",

    initialState: {
      requests: [],
      loading: false,
      error: null,
    },

    reducers: {},

    extraReducers: (
      builder
    ) => {

      builder

        .addCase(
          fetchRequests.pending,

          (state) => {

            state.loading = true;

            state.error = null;
          }
        )

        .addCase(
          fetchRequests.fulfilled,

          (
            state,
            action
          ) => {

            state.loading =
              false;

            state.requests =
              action.payload;
          }
        )

        .addCase(
          fetchRequests.rejected,

          (
            state
          ) => {

            state.loading =
              false;

            state.error =
              "Failed to load requests";
          }
        );
    },
  });

export default
procurementSlice.reducer;