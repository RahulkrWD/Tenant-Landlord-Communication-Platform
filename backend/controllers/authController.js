const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// generate Token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET
  );
};

// Signup
const Signup = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User Already Registered" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    // generate token
    const token = generateToken(newUser);
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });

    // campare password
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password" });

    // generate token
    const token = generateToken(user);
    res.status(200).json({
      success: true,
      message: "User LoggedIn Successfully",
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get User profile using ID
const getProfile = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await UserModel.findById(id).select("-password  -__v");
    if (!user)
      res.status(400).json({
        success: false,
        message: "Profile Not Found, Please create an Account",
      });

    res
      .status(200)
      .json({ success: true, message: "Fetch Proile Data", data: user });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// update profile
const updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  const id = req.user.userId;
  console.log(id);

  try {
    // Check if user exists
    const findUser = await UserModel.findById(id);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Update user
    await UserModel.findByIdAndUpdate(id, { name, phone }, { new: true });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  Login,
  Signup,
  getProfile,
  updateProfile,
};
