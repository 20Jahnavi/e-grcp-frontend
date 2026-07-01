import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import apiClient from "../../api/apiClient";

// FETCH PROCUREMENT REQUESTS
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

    extraReducers:
      (builder) => {

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
                action.payload.map(
                  (item) => ({
                    ...item,

                    status:
                      item.status ||
                      "Pending",

                    priority:
                      item.priority ||
                      "Medium",
                  })
                );

            }
          )

          // ERROR
          .addCase(
            fetchRequests.rejected,

            (
              state
            ) => {

              state.loading =
                false;

              state.error =
                "Failed to load procurement requests";

            }
          );
      },
  });

export default
procurementSlice.reducer;