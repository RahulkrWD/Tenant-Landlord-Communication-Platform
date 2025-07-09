const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: true,
  },
  property: {
    type: String,
  },
  role: {
    type: String,
    default: "landlord",
  },
});

const landlordModel = mongoose.model("Landlord", landlordSchema);
module.exports = landlordModel;
