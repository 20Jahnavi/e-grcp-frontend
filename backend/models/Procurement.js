const mongoose =
  require("mongoose");

const procurementSchema =
  new mongoose.Schema({

    department: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },

  });

module.exports =
  mongoose.model(
    "Procurement",
    procurementSchema
  );