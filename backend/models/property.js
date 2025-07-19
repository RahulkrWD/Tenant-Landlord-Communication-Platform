const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    enum: ["1BHK", "2BHK", "3BHK", "Studio", "Other"],
    required: true,
  },
  address: {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    exactLocation: {
      type: String,
      required: true,
    },
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  depositAmount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
