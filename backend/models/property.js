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
  address: {
    type: String,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
