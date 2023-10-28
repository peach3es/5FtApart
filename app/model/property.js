const mongoose = require("mongoose");
import { Schema, model, models } from "mongoose";

const propertySchema = new Schema({
  addimg: String,
  address: String,
  pricetag: String,
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
