const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const models = mongoose.models;

// will hold properties as objects
const offerSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  
  buyer:String, 
  license: Number,
  agency: String,
  address: String,   
  offer: Number, 
  deed_of_sale:String, 
  occupancy:String,
  // property:
  // {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Properties',
  // },
  // broker:
  // {
  //   type:Schema.Types.ObjectId,
  //   ref:'User',
  // },
  
});

const Offers = models.offer || model("offer", offerSchema);
module.exports = Offers;
