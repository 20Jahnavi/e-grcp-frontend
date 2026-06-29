const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const vendorRoutes =
  require("./routes/vendorRoutes");

const procurementRoutes =
  require("./routes/procurementRoutes");

const riskRoutes =
  require("./routes/riskRoutes");

// CREATE APP
const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/egrcp"
  )
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

  })
  .catch((err) => {

    console.log(
      "MongoDB Error:",
      err
    );

  });

// API Routes
app.use(
  "/api/vendors",
  vendorRoutes
);

app.use(
  "/api/procurement",
  procurementRoutes
);

app.use(
  "/api/risks",
  riskRoutes
);

// Test Route
app.get("/", (req, res) => {

  res.send(
    "e-GRCP Backend Running"
  );

});

// Server Port
const PORT = 5000;

// Start Server
app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});