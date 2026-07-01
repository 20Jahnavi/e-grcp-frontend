import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import apiClient from "../../api/apiClient";

// FETCH Vendors
export const fetchVendors =
  createAsyncThunk(
    "vendors/fetchVendors",

    async () => {

      const response =
        await apiClient.get(
          "/products"
        );

      return response.data.products;
    }
  );

// ADD Vendor
export const addVendor =
  createAsyncThunk(
    "vendors/addVendor",

    async (vendorData) => {

      const response =
        await apiClient.post(
          "/products/add",
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
        await apiClient.put(
          `/products/${id}`,
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

      await apiClient.delete(
        `/products/${id}`
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
              state.error = null;

            }
          )

          .addCase(
            fetchVendors.fulfilled,
            (state, action) => {

              state.loading = false;

              state.vendors =
                action.payload.map(
                  (vendor) => ({
                    ...vendor,

                    risk:
                      vendor.risk ||
                      "Low",

                    status:
                      vendor.status ||
                      "Active",
                  })
                );
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

              state.vendors.unshift({
                ...action.payload,

                risk:
                  action.payload.risk ||
                  "Low",

                status:
                  action.payload.status ||
                  "Active",
              });

            }
          )

          // UPDATE
          .addCase(
            updateVendor.fulfilled,
            (state, action) => {

              state.vendors =
                state.vendors.map(
                  (vendor) =>

                    vendor.id ===
                    action.payload.id

                      ? {
                          ...action.payload,

                          risk:
                            action.payload.risk ||
                            "Low",

                          status:
                            action.payload.status ||
                            "Active",
                        }

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
                    vendor.id !==
                    action.payload
                );

            }
          );
      },
  });

export default
vendorSlice.reducer;