const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const models = mongoose.models;

const propertySchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  addimg: String,
  address: String,
  pricetag: Number,
  bedrooms: Number,
  amenities: String,
  description: String,
  postalcode: String,
  city: String,
  saletype: String,
  propertytype: String,
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],


});

const Properties = models.property || model("property", propertySchema);
module.exports = Properties;
