const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// auth routes
authRouter.post("/signup", authController.Signup);
authRouter.post("/login", authController.Login);

// profile
authRouter.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["tenant", "landlord"]),
  authController.getProfile
);

module.exports = authRouter;
