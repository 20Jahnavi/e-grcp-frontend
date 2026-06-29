const express = require("express");

const router = express.Router();

const risks = [
  {
    id: 1,
    vendor: "ABC Pvt Ltd",
    level: "High",
    issue: "Data Security",
  },
  {
    id: 2,
    vendor: "XYZ Corp",
    level: "Medium",
    issue: "Late Delivery",
  },
  {
    id: 3,
    vendor: "Tech Solutions",
    level: "Low",
    issue: "Minor Compliance",
  },
];

router.get("/", (req, res) => {

  res.json(risks);

});

module.exports = router;