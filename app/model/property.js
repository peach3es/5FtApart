const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const models = mongoose.models;
const User = require('./user');


const propertySchema = new Schema({
    avatar: String, 
    Address: String,
    Price: Number,
    Bedrooms: Number,
    Amenities: String,
    Description: String, 
    PostalCode:String, 
    City:String, 
    SaleType:String,
    PropertyType:String, 
    userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
})

const Property = models.property || model('property', propertySchema)
module.exports = Property; 