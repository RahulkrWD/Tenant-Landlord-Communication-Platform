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

// tentant
const tenantSignup = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const existTenant = await UserModel.findOne({ email });
    if (existTenant)
      return res
        .status(400)
        .json({ success: false, message: "Tenant Already Registered" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const newTenant = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    // generate token
    const token = generateToken(newTenant);
    res.status(200).json({
      success: true,
      message: "Tenant Registered Successfully",
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
const tenantLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const tenant = await UserModel.findOne({ email });
    if (!tenant)
      return res
        .status(404)
        .json({ success: false, message: "Tenant Not Found" });

    // campare password
    const isPassword = await bcrypt.compare(password, tenant.password);
    if (!isPassword)
      return res
        .status(404)
        .json({ success: false, message: "Invalid password" });

    // generate token
    const token = generateToken(tenant);
    res
      .status(200)
      .json({ success: true, message: "Tenant LoggedIn Successfully", token });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Landlord
const landlordSignup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  try {
    const existLandlord = await UserModel.findOne({ email });
    if (existLandlord)
      return res
        .status(400)
        .json({ success: false, message: "Landlord Already Registered" });

    // hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new Landlord
    const landlord = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // generate token
    const token = generateToken(landlord);
    res.status(200).json({
      success: true,
      message: "Landlord Registered Successfully",
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
const landlordLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const landlord = await UserModel.findOne({ email });
    if (!landlord)
      return res
        .status(404)
        .json({ success: false, message: "Landlord Not Found" });

    // campare password
    const isPassword = await bcrypt.compare(password, landlord.password);
    if (!isPassword)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password" });

    // generate token
    const token = generateToken(landlord);
    res.status(200).json({
      success: true,
      message: "Landlord LoggedIn Successfully",
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

// get Tenant and landlord profile using ID
const getProfile = async (req, res) => {
  try {
    const id = req.user.userId;
    const tenant = await UserModel.findById(id).select("-password  -__v");
    if (!tenant)
      res.status(400).json({
        success: false,
        message: "Profile Not Found, Please create an Account",
      });

    res
      .status(200)
      .json({ success: false, message: "Fetch Proile Data", data: tenant });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  tenantLogin,
  tenantSignup,
  landlordSignup,
  landlordLogin,
  getProfile,
};
