const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const models = mongoose.models;

const propertySchema = new Schema({
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

// import mongoose, { Schema, model, models } from "mongoose";

// interface IProperty {
//   addimg: string;
//   address: string;
//   pricetag: number;
//   bedrooms: number;
//   amenities: string;
//   description: string;
//   postalcode: string;
//   city: string;
//   saletype: string;
//   propertytype: string;
//   userId: mongoose.Schema.Types.ObjectId[];
// }

// const propertySchema = new Schema<IProperty>({
//   addimg: String,
//   address: String,
//   pricetag: Number,
//   bedrooms: Number,
//   amenities: String,
//   description: String,
//   postalcode: String,
//   city: String,
//   saletype: String,
//   propertytype: String,
//   userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
// });

// const Properties =
//   models.property || model<IProperty>("property", propertySchema);
// export default Properties;
