
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

// FETCH REQUESTS
export const fetchRequests =
  createAsyncThunk(
    "procurement/fetchRequests",

    async () => {

      const response =
        await axios.get(
          "http://localhost:5000/api/procurement"
        );

      return response.data;
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

        // LOADING
        .addCase(
          fetchRequests.pending,

          (state) => {

            state.loading = true;

            state.error = null;
          }
        )

        // SUCCESS
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

        // ERROR
        .addCase(
          fetchRequests.rejected,

          (
            state,
            action
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
