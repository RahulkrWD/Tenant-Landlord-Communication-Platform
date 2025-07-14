const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    enum: ["tenant", "landlord"],
    required: true,
  },
});

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
