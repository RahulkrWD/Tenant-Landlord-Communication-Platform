const interestedModel = require("../models/interestedProperty");
const addToCartModel = require("../models/addToCart");
const bookingModel = require("../models/booking");
const propertyModel = require("../models/property");

const makeInterested = async (req, res) => {
  const id = req.params.id;
  try {
    const property = await propertyModel.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
const removeInterested = async (req, res) => {};
const addToCart = async (req, res) => {};
const removeFromCart = async (req, res) => {};
const bookingRequest = async (req, res) => {};
const updateBookingRequest = async (req, res) => {};

module.exports = {
  makeInterested,
  removeInterested,
  addToCart,
  removeFromCart,
  bookingRequest,
  updateBookingRequest,
};
