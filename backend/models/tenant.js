const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: "tenant",
  },
});

const TenantModel = mongoose.model("Tenant", TenantSchema);
module.exports = TenantModel;
