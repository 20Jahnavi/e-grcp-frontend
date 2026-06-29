const express =
  require("express");

const router =
  express.Router();

const Vendor =
  require("../models/Vendor");


// GET Vendors
router.get(
  "/",
  async (req, res) => {

    try {

      const vendors =
        await Vendor.find();

      res.json(vendors);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// ADD Vendor
router.post(
  "/",
  async (req, res) => {

    try {

      const vendor =
        new Vendor(req.body);

      const savedVendor =
        await vendor.save();

      res.status(201).json(
        savedVendor
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// UPDATE Vendor
router.put(
  "/:id",
  async (req, res) => {

    try {

      const updatedVendor =
        await Vendor.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(
        updatedVendor
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// DELETE Vendor
router.delete(
  "/:id",
  async (req, res) => {

    try {

      await Vendor.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Vendor Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;