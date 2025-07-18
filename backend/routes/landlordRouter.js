const express = require("express");
const landlordRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const landlordController = require("../controllers/landlordController");

// create property
landlordRouter.post(
  "/create-property",
  authMiddleware,
  roleMiddleware(["landlord"]),
  landlordController.createProperty
);

// get property
landlordRouter.get(
  "/get-property",
  authMiddleware,
  roleMiddleware(["landlord"]),
  landlordController.getproperty
);

// delete property
landlordRouter.get(
  "/get-property/:id",
  authMiddleware,
  roleMiddleware(["landlord"]),
  landlordController.getPropertyById
);
// soft delete
landlordRouter.patch(
  "/delete-property/:id",
  authMiddleware,
  roleMiddleware(["landlord"]),
  landlordController.softDeleteProperty
);

// hard delete
landlordRouter.delete(
  "/delete-property/:id",
  authMiddleware,
  roleMiddleware(["landlord"]),
  landlordController.hardDeleteProperty
);

landlordRouter.patch(
  "/update-property/:id",
  authMiddleware,
  roleMiddleware(["landlord"]),
  landlordController.updatePropertyById
);

module.exports = landlordRouter;
