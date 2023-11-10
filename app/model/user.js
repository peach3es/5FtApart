const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const models = mongoose.models;

const userSchema = new Schema({
  name: String,
  avatar: String,
  email: String,
  password: String,
  date: String,
  activeListings: Number,
  role: {
    type: String,
    enum: ["client", "broker", "admin"],
    required: false,
  },
});

const Users = models.user || model("user", userSchema);
module.exports = Users;
