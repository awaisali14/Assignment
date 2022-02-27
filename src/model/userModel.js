const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validate: [validator.isEmail, "Please Provide Valid Email"],
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    max: 8,
  },
  image: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
// { timestamps: true }
