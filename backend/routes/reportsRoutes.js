const express = require("express");

const router = express.Router();

router.get("/download-pdf", (req, res) => {

  res.json({
    message:
      "PDF Report Download API Working",
  });

});

router.get("/download-excel", (req, res) => {

  res.json({
    message:
      "Excel Report Download API Working",
  });

});

module.exports = router;