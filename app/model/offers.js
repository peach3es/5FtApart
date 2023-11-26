const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const models = mongoose.models;

// will hold properties as objects
const offerSchema = new Schema({

  license: Number,
  agency: String,   
  offer: Number, 
  deed_of_sale_date_start: String, 
  deed_of_sale_date_end: String, 
  broker_buyer_name: String,
  broker_buyer_address: String, 
  broker_buyer_email: String,
  status: String,
  property_address: String,
  property_id: String,
  broker_owner:{ type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
  broker_buyer:{ type: mongoose.Schema.Types.ObjectId, ref: "user" }, 

});

const Offers = models.offer || model("offer", offerSchema);
module.exports = Offers;
