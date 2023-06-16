// import mongoose and bcrypt
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// create user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
});

// encrypt password before saving into database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// create user model
const User = mongoose.model("User", userSchema);

// export model
module.exports = User;
