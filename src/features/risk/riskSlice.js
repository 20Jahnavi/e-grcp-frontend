import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import riskData
from "../../mocks/riskData.json";

export const fetchRisks =
  createAsyncThunk(
    "risk/fetchRisks",

    async () => {

      return new Promise(
        (resolve) => {

          setTimeout(() => {

            resolve(riskData);

          }, 1000);
        }
      );
    }
  );

const riskSlice =
  createSlice({

    name: "risk",

    initialState: {

      risks: [],

      loading: false,

      error: null,
    },

    reducers: {},

    extraReducers: (builder) => {

      builder

        .addCase(
          fetchRisks.pending,

          (state) => {

            state.loading = true;
          }
        )

        .addCase(
          fetchRisks.fulfilled,

          (state, action) => {

            state.loading = false;

            state.risks =
              action.payload;
          }
        )

        .addCase(
          fetchRisks.rejected,

          (state) => {

            state.loading = false;

            state.error =
              "Failed to load risks";
          }
        );
    },
  });

export default
riskSlice.reducer;