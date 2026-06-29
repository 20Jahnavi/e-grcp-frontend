const mongoose =
  require("mongoose");

const vendorSchema =
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    risk: {
      type: String,
      default: "Low",
    },

    status: {
      type: String,
      default: "Active",
    },
  });

module.exports =
  mongoose.model(
    "Vendor",
    vendorSchema
  );