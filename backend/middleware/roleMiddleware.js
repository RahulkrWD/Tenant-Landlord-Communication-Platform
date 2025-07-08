const roleMiddleware = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (role.includes(userRole)) {
      next();
    } else {
      res.status(404).json({ message: "Access Denied", success: false });
    }
  };
};
module.exports = roleMiddleware;
