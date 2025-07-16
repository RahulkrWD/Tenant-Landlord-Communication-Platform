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

landlordRouter.patch(
  "/delete-property/:id",
  authMiddleware,
  roleMiddleware(["landlord"]),
  landlordController.deletePropertyById
);

landlordRouter.patch(
  "/update-property/:id",
  authMiddleware,
  roleMiddleware(["landlord"]),
  landlordController.updatePropertyById
);

module.exports = landlordRouter;
