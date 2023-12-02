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
