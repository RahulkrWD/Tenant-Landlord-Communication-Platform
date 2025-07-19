const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const propertyController = require("../controllers/propertyController");

// create property
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["landlord"]),
  propertyController.createProperty
);

// get property
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["landlord", "tenant"]),
  propertyController.getproperty
);

// get property by id
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["landlord", "tenant"]),
  propertyController.getPropertyById
);
// soft delete
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["landlord"]),
  propertyController.softDeleteProperty
);

// hard delete
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["landlord"]),
  propertyController.hardDeleteProperty
);

module.exports = router;
