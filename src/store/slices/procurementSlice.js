import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import apiClient from "../../api/apiClient";

// FETCH REQUESTS
export const fetchRequests =
  createAsyncThunk(
    "procurement/fetchRequests",

    async (_, { rejectWithValue }) => {

      try {

        const response =
          await apiClient.get(
            "/products"
          );

        return response.data.products;

      }

      catch (error) {

        return rejectWithValue(
          "Failed to load requests"
        );

      }
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

          (state, action) => {

            state.loading = false;

            state.requests =
              action.payload;

          }
        )

        .addCase(
          fetchRequests.rejected,

          (state, action) => {

            state.loading = false;

            state.error =
              action.payload;

          }
        );
    },
  });

export default
procurementSlice.reducer;