const express = require("express");

const router = express.Router();

// Dummy Procurement Data
const procurementRequests = [
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
];

// GET Procurement Requests
router.get("/", (req, res) => {

  res.json(procurementRequests);

});

module.exports = router;