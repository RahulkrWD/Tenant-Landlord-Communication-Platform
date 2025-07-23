const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  addToCart: {
    type: Boolean,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const addToCart = mongoose.model("addToCart", addToCartSchema);
module.exports = addToCart;
