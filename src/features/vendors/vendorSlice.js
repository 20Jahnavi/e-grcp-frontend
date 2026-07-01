import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

// GET Vendors
export const fetchVendors =
  createAsyncThunk(
    "vendors/fetchVendors",

    async () => {

      const response =
        await axios.get(
          "/api/vendors"
        );

      return response.data;
    }
  );

// ADD Vendor
export const addVendor =
  createAsyncThunk(
    "vendors/addVendor",

    async (vendorData) => {

      const response =
        await axios.post(
          "/api/vendors",
          vendorData
        );

      return response.data;
    }
  );

// UPDATE Vendor
export const updateVendor =
  createAsyncThunk(
    "vendors/updateVendor",

    async ({
      id,
      vendorData,
    }) => {

      const response =
        await axios.put(
          `/api/vendors/${id}`,
          vendorData
        );

      return response.data;
    }
  );

// DELETE Vendor
export const deleteVendor =
  createAsyncThunk(
    "vendors/deleteVendor",

    async (id) => {

      await axios.delete(
        `/api/vendors/${id}`
      );

      return id;
    }
  );

const vendorSlice =
  createSlice({
    name: "vendors",

    initialState: {
      vendors: [],
      loading: false,
      error: null,
    },

    reducers: {},

    extraReducers:
      (builder) => {

        builder

          // FETCH
          .addCase(
            fetchVendors.pending,
            (state) => {

              state.loading = true;
            }
          )

          .addCase(
            fetchVendors.fulfilled,
            (state, action) => {

              state.loading = false;

              state.vendors =
                action.payload;
            }
          )

          .addCase(
            fetchVendors.rejected,
            (state) => {

              state.loading = false;

              state.error =
                "Failed to load vendors";
            }
          )

          // ADD
          .addCase(
            addVendor.fulfilled,
            (state, action) => {

              state.vendors.push(
                action.payload
              );
            }
          )

          // UPDATE
          .addCase(
            updateVendor.fulfilled,
            (state, action) => {

              state.vendors =
                state.vendors.map(
                  (vendor) =>
                    vendor._id ===
                    action.payload._id
                      ? action.payload
                      : vendor
                );
            }
          )

          // DELETE
          .addCase(
            deleteVendor.fulfilled,
            (state, action) => {

              state.vendors =
                state.vendors.filter(
                  (vendor) =>
                    vendor._id !==
                    action.payload
                );
            }
          );
      },
  });

export default
vendorSlice.reducer;