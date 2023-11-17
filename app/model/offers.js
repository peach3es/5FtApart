const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const models = mongoose.models;

// will hold properties as objects
const offerSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  
  broker_name:String, 
  license: Number,
  agency: String,
  client_name:String,
  currentaddress: String, 
  email: String,    
  offer: Number, 
  address: String, 
  deed_of_sale:String, 
  occupancy:String,
  status:String, 
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
