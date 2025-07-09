const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Tenant
authRouter.post("/tenant-signup", authController.tenantSignup);
authRouter.post("/tenant-login", authController.tenantLogin);

// Landlord
authRouter.post("/landlord-signup", authController.landlordSignup);
authRouter.post("/landlord-login", authController.landlordLogin);

// Tenant and Landlord profile
authRouter.get(
  "/tenant",
  authMiddleware,
  roleMiddleware(["tenant"]),
  authController.getTanent
);
authRouter.get(
  "/landlord",
  authMiddleware,
  roleMiddleware(["landlord"]),
  authController.getLandlord
);

module.exports = authRouter;
