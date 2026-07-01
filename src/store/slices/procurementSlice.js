
import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {

  requests: [

    {
      id: 1,
      department: "IT",
      amount: 50000,
      status: "Pending",
    },

    {
      id: 2,
      department: "HR",
      amount: 25000,
      status: "Approved",
    },

    {
      id: 3,
      department: "Finance",
      amount: 75000,
      status: "Rejected",
    },

  ],

  loading: false,

  error: null,

};

const procurementSlice =
  createSlice({

    name: "procurement",

    initialState,

    reducers: {

      addRequest: (
        state,
        action
      ) => {

        state.requests.unshift({

          id: Date.now(),

          ...action.payload,

        });

      },

      updateRequest: (
        state,
        action
      ) => {

        state.requests =
          state.requests.map(
            (request) =>

              request.id ===
              action.payload.id

                ? action.payload

                : request
          );

      },

      deleteRequest: (
        state,
        action
      ) => {

        state.requests =
          state.requests.filter(
            (request) =>

              request.id !==
              action.payload
          );

      },

    },

  });

export const {

  addRequest,

  updateRequest,

  deleteRequest,

} = procurementSlice.actions;

export default
procurementSlice.reducer;
