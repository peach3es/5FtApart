/**Controller */
const Users = require("../../app/model/user");
const Properties = require("../../app/model/property");

//---------------------------------------------------------------------------------------------
//User database here
//---------------------------------------------------------------------------------------------

// get: http://localhost:3000/api/users
async function getUsers(req, res) {
  try {
    const users = await Users.find({});

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
    console.log(formData);
    if (!formData) {
      return res.status(404).json({ error: "Form Data Not Provided" });
    }
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
};
