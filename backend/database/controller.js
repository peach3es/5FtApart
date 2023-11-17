/**Controller */
const Users = require("../../app/model/user");
const Properties = require("../../app/model/property");
const mongoose = require("mongoose")
const Offers = require("../../app/model/offers");

//---------------------------------------------------------------------------------------------
//User database here
//---------------------------------------------------------------------------------------------

// get: http://localhost:3000/api/users
async function getUsers(req, res) {
  try {
    
    const users = await Users.find({ role: "broker" });

    if (!users) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error while fetching Data" });
  }
}
// get: http://localhost:3000/api/users/1
async function getUser(req, res) {
  try {
    const { userID } = req.params;

    if (userID) {
      const user = await Users.findById(userID);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Cannot get User" });
  }
}

// post: http://localhost:3000/api/users
async function postUser(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided" });

    const newUser = await Users.create(formData);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// put: http://localhost:3000/api/users/1
async function putUser(req, res) {
  try {
    const { userID } = req.query;
    const formData = req.body;

    if (userID && formData) {
      const user = await Users.findByIdAndUpdate(userID, formData);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User Not Selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while updating the Data" });
  }
}

// delete: http://localhost:3000/api/users/1
async function deleteUser(req, res) {
  try {
    const { userID } = req.query;

    if (userID) {
      const user = await Users.findByIdAndDelete(userID);
      return res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while deleting user" });
  }
}

async function getUsersFiltered(req, res, filters = {}) {
  try {
    let query = {};

    if (filters.term) {
      query.name = new RegExp(filters.term, "i");
    }

    const user = await Users.find(query);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//---------------------------------------------------------------------------------------------
//Property database here
//---------------------------------------------------------------------------------------------

// get: http://localhost:3000/api/property
//get the properties currently available
async function getProperties(req, res) {
  try {
    const property = await Properties.find({});
    if (!property) {
      return res.status(404).json({ error: "Data not Found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error(error); // Add this line to log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// get the properties for the broker in session
async function getBrokerProperties(req, res) {
  try {
    const { brokerID } = req.params;

    // Ensure brokerID is a valid ObjectId
    if (!brokerID || !mongoose.Types.ObjectId.isValid(brokerID)) {
      return res.status(400).json({ error: "Invalid or missing broker ID" });
    }

    const properties = await Properties.find({ "userId": brokerID });
    if (properties.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// get: http://localhost:3000/api/property/1
//search
async function getProperty(req, res) {
  try {
    const { propertyId } = req.params;

    if (propertyId) {
      const property = await Properties.findById(propertyId);
      if (property) {
        res.status(200).json(property);
      } else {
        res.status(404).json({ error: "Property not found" });
      }
    } else {
      res.status(400).json({ error: "Property ID not selected" });
    }
  } catch (error) {
    res.status(500).json({ error: "Cannot get property" });
  }
}

// post: http://localhost:3000/api/property
//Adding properties
async function addProperty(req, res) {
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: "Form Data Not Provided" });
    }
    console.log("here" + formData)
    const newProperty = await Properties.create(formData);
    return res.status(200).json(newProperty);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

// put: http://localhost:3000/api/property/1
//Updating a specific property based on ID
async function putProperty(req, res) {
  try {
    const { propertyId } = req.query;
    const formData = req.body;

    if (propertyId && formData) {
      const property = await Properties.findByIdAndUpdate(propertyId, formData);
      res.status(200).json(property);
    } else {
      res.status(404).json({ error: "Property Not Selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while updating the Property" });
  }
}

// delete: http://localhost:3000/api/property/1
async function deleteProperty(req, res) {
  try {
    const { propertyId } = req.query;

    if (propertyId) {
      const property = await Properties.findByIdAndDelete(propertyId);
      return res.status(200).json(property);
    } else {
      res.status(404).json({ error: "Property not selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while deleting Property" });
  }
}

async function getPropertiesFiltered(req, res, filters = {}) {
  try {
    let query = {};

    if (filters.term) {
      query.address = new RegExp(filters.term, "i"); // Assuming the properties have an address field
    }
    if (filters.saleType) {
      query.saletype = filters.saleType;
    }
    if (filters.propertyType) {
      query.propertytype = filters.propertyType;
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      query.pricetag = { $gte: min, $lte: max };
    }

    const property = await Properties.find(query);

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function checkUser(req, res) {
  try {
    const { email } = await req.params;
    const user = await Users.findOne({ email }).select("_id");
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//---------------------------------------------------------------------------------------------
//Offer database here
//---------------------------------------------------------------------------------------------

// get: http://localhost:3000/api/property
//get the properties currently available
async function getOffers(req, res) {
  try {
    const offer = await Offers.find({});
    if (!offer) {
      return res.status(404).json({ error: "Data not Found" });
    }
    res.status(200).json(offer);
  } catch (error) {
    console.error(error); // Add this line to log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// get: http://localhost:3000/api/property/1
//search
async function getOffer(req, res) {
  try {
    const { offerId } = req.params;

    if (offerId) {
      const offer = await Offers.findById(offerId);
      if (offer) {
        res.status(200).json(offer);
      } else {
        res.status(404).json({ error: "offer" });
      }
    } else {
      res.status(400).json({ error: "Property ID not selected" });
    }
  } catch (error) {
    res.status(500).json({ error: "Cannot get property" });
  }
}

// post: http://localhost:3000/api/property
//Adding offers
async function addOffer(req, res) {
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: "Form Data Not Provided" });
    }
    const newOffer = await Properties.create(formData);
    return res.status(200).json(newOffer);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

// put: http://localhost:3000/api/property/1
//Updating a specific property based on ID
async function putOffer(req, res) {
  try {
    const { offerId } = req.query;
    const formData = req.body;

    if (offerId && formData) {
      const property = await Properties.findByIdAndUpdate(offerId, formData);
      res.status(200).json(property);
    } else {
      res.status(404).json({ error: "Property Not Selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while updating the Offer" });
  }
}

// delete: http://localhost:3000/api/property/1
async function deleteOffer(req, res) {
  try {
    const { offerId } = req.query;

    if (offerId) {
      const property = await Properties.findByIdAndDelete(offerId);
      return res.status(200).json(property);
    } else {
      res.status(404).json({ error: "Property not selected" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error while deleting Offer" });
  }
}

async function getOfferFiltered(req, res, filters = {}) {
  try {
    let query = {};

    if (filters.term) {
      query.address = new RegExp(filters.term, "i"); // Assuming the properties have an address field
    }
    if (filters.saleType) {
      query.saletype = filters.saleType;
    }
    if (filters.propertyType) {
      query.propertytype = filters.propertyType;
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      query.pricetag = { $gte: min, $lte: max };
    }

    const property = await Properties.find(query);

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  postUser: postUser,
  putUser: putUser,
  deleteUser: deleteUser,
  getProperties: getProperties,
  getProperty: getProperty,
  addProperty: addProperty,
  putProperty: putProperty,
  deleteProperty: deleteProperty,
  getPropertiesFiltered: getPropertiesFiltered,
  checkUser: checkUser,
  getUsersFiltered: getUsersFiltered,
  getBrokerProperties: getBrokerProperties,
  getOffers:getOffers,
  getOffer:getOffer,
  addOffer:addOffer,
  putOffer:putOffer,
  deleteOffer:deleteOffer,
  getOfferFiltered:getOfferFiltered,
};
