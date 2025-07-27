const express = require("express");
const router = express.Router();
const propertyManagementController = require("../controllers/propertyManagementController");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// interested property
router.post(
  "/interested/:id",
  authMiddleware,
  roleMiddleware(["tenant"]),
  propertyManagementController.makeInterested
);

router.get(
  "/interested",
  authMiddleware,
  roleMiddleware(["tenant"]),
  propertyManagementController.getInterested
);

router.delete(
  "/interested/:id",
  authMiddleware,
  roleMiddleware(["tenant"]),
  propertyManagementController.removeInterested
);

// add to cart
router.post(
  "/add-to-cart/:id",
  authMiddleware,
  roleMiddleware(["tenant"]),
  propertyManagementController.addToCart
);

router.get(
  "/cart",
  authMiddleware,
  roleMiddleware(["tenant"]),
  propertyManagementController.getCart
);

router.delete(
  "/remove-from-cart/:id",
  authMiddleware,
  roleMiddleware(["tenant"]),
  propertyManagementController.removeFromCart
);

// booking request
router.post(
  "/booking-request/:id",
  authMiddleware,
  roleMiddleware(["tenant"]),
  propertyManagementController.bookingRequest
);

router.patch(
  "/booking-request/:id",
  authMiddleware,
  roleMiddleware(["landlord"]),
  propertyManagementController.updateBookingRequest
);

module.exports = router;
