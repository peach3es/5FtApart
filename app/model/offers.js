const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const models = mongoose.models;

// will hold properties as objects
const offerSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  
  properties: [propertySchema],
  
});

const Offers = models.offer || model("offer", offerSchema);
module.exports = Offers;
