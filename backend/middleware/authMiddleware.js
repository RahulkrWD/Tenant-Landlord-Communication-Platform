const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // userId, role, email
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Unauthorized", error: error.message, success: false });
  }
};

module.exports = authMiddleware;
