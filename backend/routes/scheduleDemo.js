const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    const { name, companyName, email, phone, propertyCount, message } =
      req.body;

    // Email content
    const mailOptions = {
      from: `Demo Scheduler ${process.env.USER_EMAIL}`,
      to: process.env.USER_EMAIL,
      subject: "New Demo Schedule Request",
      html: `
      <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company Name:</strong> ${companyName || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Number of Properties:</strong> ${propertyCount || "N/A"}</p>
        <p><strong>Message:</strong><br>${message}</p>
        `,
    };
    // send email
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Demo Request send successfully!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send demo request",
      error: error.message,
    });
  }
});
module.exports = router;
