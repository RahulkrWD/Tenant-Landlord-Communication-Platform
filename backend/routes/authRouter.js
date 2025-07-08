const express = require("express");
const authRouter = express.Router();
const rateLimit = require("express-rate-limit");

// rate limit
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many OTP requests from this IP, please try again later",
  },
});

module.exports = authRouter;
