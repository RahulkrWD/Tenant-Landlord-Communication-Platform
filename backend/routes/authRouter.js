const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// auth routes
authRouter.post("/signup", authController.Signup);
authRouter.post("/login", authController.Login);

// profile
authRouter.get("/profile", authMiddleware, authController.getProfile);

authRouter.patch("/profile", authMiddleware, authController.updateProfile);

module.exports = authRouter;
