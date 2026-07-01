
import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {

  vendors: [

    {
      id: 1,
      title: "Infosys",
      category: "IT Services",
      risk: "Low",
      status: "Active",
    },

    {
      id: 2,
      title: "TCS",
      category: "Software",
      risk: "Medium",
      status: "Active",
    },

    {
      id: 3,
      title: "Wipro",
      category: "Cloud",
      risk: "High",
      status: "Inactive",
    },

  ],

  loading: false,

  error: null,

};

const vendorSlice =
  createSlice({

    name: "vendors",

    initialState,

    reducers: {

      // ADD
      addVendor: (
        state,
        action
      ) => {

        state.vendors.unshift({

          id: Date.now(),

          ...action.payload,

        });

      },

      // UPDATE
      updateVendor: (
        state,
        action
      ) => {

        state.vendors =
          state.vendors.map(
            (vendor) =>

              vendor.id ===
              action.payload.id

                ? action.payload

                : vendor
          );

      },

      // DELETE
      deleteVendor: (
        state,
        action
      ) => {

        state.vendors =
          state.vendors.filter(
            (vendor) =>

              vendor.id !==
              action.payload
          );

      },

    },

  });

export const {

  addVendor,

  updateVendor,

  deleteVendor,

} = vendorSlice.actions;

export default
vendorSlice.reducer;
