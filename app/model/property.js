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
  saletype: {
    type: String,
    enum: ["for-sale", "for-rent"]
  },
  propertytype: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true
  },
  salestatus: {
    type: String,
    enum: ["sold", "available"],
    default: "available",
    required: false 
  },
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

});

propertySchema.pre('save', function(next) {

  if (this.saletype === 'for-rent') {
    this.salestatus = undefined;
  }

  if (this.isModified('saletype') && this.saletype === 'for-rent') {
    delete this._doc.salestatus;
  }

  next();
});



propertySchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    const propertyId = doc._id;

    // Use the `updateMany` method to remove the propertyId from all favorites
    // that reference this propertyId
    await mongoose.model("user").updateMany({}, {
      $pull: { favoritePropertyIds: propertyId }
    });
  }

  next();
});
const Properties = models.property || model("property", propertySchema);
module.exports = Properties;
