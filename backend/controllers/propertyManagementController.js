const interestedModel = require("../models/interestedProperty");
const addToCartModel = require("../models/addToCart");
const BookingModel = require("../models/booking");
const propertyModel = require("../models/property");

const makeInterested = async (req, res) => {
  const propertyId = req.params.id;
  const tenantId = req.user.userId;
  try {
    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    // check if already marked as interested
    const alreadyInterested = await interestedModel.findOne({
      tenantId,
      propertyId,
    });
    if (alreadyInterested)
      return res.status(400).json({
        message: "already marked as interested",
        success: false,
      });

    // create a new interest entry
    const newInterested = await interestedModel.create({
      tenantId,
      propertyId,
      interested: true,
    });
    res.status(200).json({
      message: "Property marked as interested",
      data: newInterested,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const getInterested = async (req, res) => {
  const tenantId = req.user.userId;
  try {
    const interested = await interestedModel
      .find({ tenantId })
      .populate("propertyId")
      .select("-landlordId -_id");

    if (interested.length == 0)
      return res.status(200).json({
        message: "Interested property",
        success: true,
        data: [],
      });
    res.status(200).json({
      message: "Interested property",
      success: true,
      data: interested,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

// remove interested
const removeInterested = async (req, res) => {
  const propertyId = req.params.id;
  const tenantId = req.user.userId;
  try {
    const interest = await interestedModel.findOneAndDelete({
      tenantId,
      propertyId,
    });

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Interest not found for this property",
      });
    }
    res.status(200).json({
      success: true,
      message: "Interest removed from property",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const addToCart = async (req, res) => {
  const propertyId = req.params.id;
  const tenantId = req.user.userId;
  try {
    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // check if already marked as interested
    const alreadyInCart = await addToCartModel.findOne({
      tenantId,
      propertyId,
    });

    if (alreadyInCart) {
      return res.status(400).json({
        success: false,
        message: "Property already in cart",
      });
    }

    // create a add to cart entry
    const addToCart = await addToCartModel.create({
      tenantId,
      propertyId,
      addToCart: true,
    });

    res.status(200).json({
      success: true,
      message: "Property added to cart successfully",
      data: addToCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  const tenantId = req.user.userId;
  try {
    const cartItems = await addToCartModel
      .find({ tenantId })
      .populate("propertyId")
      .select("-landlordId -_id");

    if (cartItems.length == 0)
      return res
        .status(200)
        .json({ message: "Cart is Empty", success: true, data: [] });

    res
      .status(200)
      .json({ message: "Cart Items", success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const removeFromCart = async (req, res) => {
  const propertyId = req.params.id;
  const tenantId = req.user.userId;
  try {
    const removed = await addToCartModel.findOneAndDelete({
      tenantId,
      propertyId,
    });

    if (!removed) {
      return res.status(404).json({
        success: false,
        message: "Property not found in cart",
      });
    }
    res.status(200).json({
      success: true,
      message: "Property removed from cart successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const bookingRequest = async (req, res) => {
  const propertyId = req.params.id;
  const tenantId = req.user.userId;

  try {
    // Check if property exists
    const property = await propertyModel.findById(propertyId);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    // Check if booking already exists
    const existingBooking = await BookingModel.findOne({
      tenantId,
      propertyId,
    });
    if (existingBooking)
      return res
        .status(400)
        .json({ success: false, message: "Booking already requested" });

    // Create a new booking request
    const booking = await BookingModel.create({
      tenantId,
      propertyId,
    });
    res.status(200).json({
      success: true,
      message: "Booking request submitted successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getBookingRequest = async (req, res) => {
  const tenantId = req.user.userId;
  try {
    const booking = await BookingModel.find({ tenantId })
      .populate("propertyId")
      .select("-landlordId -_id");

    if (booking.length == 0)
      return res.status(200).json({
        message: "Interested property",
        success: true,
        data: [],
      });
    res.status(200).json({
      message: "Interested property",
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateBookingRequest = async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;
  try {
    const updateBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    if (!updateBooking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
      data: updateBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  makeInterested,
  getInterested,
  removeInterested,
  addToCart,
  getCart,
  removeFromCart,
  bookingRequest,
  getBookingRequest,
  updateBookingRequest,
};
