const PropertyModel = require("../models/property");

// only landlord will create property
const createProperty = async (req, res) => {
  try {
    const { userId } = req.user;
    await PropertyModel.create({ landlordId: userId, ...req.body });
    res
      .status(200)
      .json({ message: "Property Created Successfull", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

// landlord will get only own property
const getproperty = async (req, res) => {
  try {
    const { userId } = req.user;
    const properties = await PropertyModel.find({ landlordId: userId });
    res
      .status(200)
      .json({ success: true, message: "Fetch Properties", properties });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};

// get property by id
const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const findProperty = await PropertyModel.findById(id);

    if (!findProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "fetch Property",
      data: findProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete property by id
const deletePropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await PropertyModel.findById(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await PropertyModel.findByIdAndUpdate(
      id,
      { isActive: !property.isActive },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Property deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// update property by id
const updatePropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    // check if the property exists
    const findProperty = await PropertyModel.findById(id);
    if (!findProperty)
      return res
        .status(404)
        .json({ message: "Property not found", success: false });

    const updateProperty = await PropertyModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Property update ", success: true, updateProperty });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getproperty,
  getPropertyById,
  deletePropertyById,
  updatePropertyById,
};
