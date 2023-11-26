const express = require("express");
const next = require("next");
const connectMongo = require("./conn.js");
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  checkUser,
  getUsersFiltered,
  getBrokerProperties
} = require("./controller.js");
const {
  getProperties,
  getProperty,
  addProperty,
  putProperty,
  deleteProperty,
  getPropertiesFiltered
} = require("./controller.js");
const {
  addOffer,
  getBrokerOffers,
  deleteOffer,
  deleteOffersByPropertyId
} = require("./controller.js");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  connectMongo().catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

  // Add your Express middleware and routes here

  server.get("/api/userExists/:email", async (req, res) => {
    checkUser(req, res);
  });

  server.get("/api/users", (req, res) => {
    getUsers(req, res);
  });

  server.get("/api/users/:userID", (req, res) => {
    getUser(req, res);
  });

  server.post("/api/users", (req, res) => {
    //res.status(200).json({ method: 'POST Request' });
    postUser(req, res);
  });

  server.put("/api/users", (req, res) => {
    //res.status(200).json({ method: 'PUT Request' });
    putUser(req, res);
  });

  server.delete("/api/users", (req, res) => {
    //res.status(200).json({ method: 'DELETE Request' });
    deleteUser(req, res);
  });

  server.get("/api/userfilter", (req, res) => {
    const { term } = req.query;
    getUsersFiltered(req, res, {
      term,
    });
  });

  server.get("/api/data", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  //---------------------------------------------------------------
  //For properties
  //---------------------------------------------------------------
  server.get("/api/property", (req, res) => {
    getProperties(req, res);
  });

  server.get("/api/property", (req, res) => {
    getProperties(req, res);
  });

  server.get("/api/brokerproperty/:brokerID", (req, res) => {
    getBrokerProperties(req, res);
  });
  
  server.get("/api/property/:propertyId", (req, res) => {
    getProperty(req, res);
  });

  server.post("/api/property", (req, res) => {
    // res.status(200).json({ method: "POST Request" });
    addProperty(req, res);
  });

  server.put("/api/property", (req, res) => {
    //res.status(200).json({ method: 'PUT Request' });
    putProperty(req, res);
  });

  server.delete("/api/property", (req, res) => {
    //res.status(200).json({ method: 'DELETE Request' });
    deleteProperty(req, res);
  });

  server.get("/api/data/property", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  server.get("/api/propertyfilter", (req, res) => {
    const { term, saleType, propertyType, priceRange } = req.query;

    getPropertiesFiltered(req, res, {
      term,
      saleType,
      propertyType,
      priceRange,
    });
  });

  //---------------------------------------------------------------
  //For offers
  //---------------------------------------------------------------

  server.post("/api/offer", (req, res) => {
    //res.status(200).json({ method: 'PUT Request' });
    addOffer(req, res);
  });

  server.get("/api/brokeroffer/:brokerID", (req, res) => {
    getBrokerOffers(req, res);
  });

  server.delete("/api/offersdelete", (req, res) => {
    deleteOffersByPropertyId(req, res);
  });

  server.delete("/api/offerdelete", (req, res) => {
    deleteOffer(req, res);
  });

  //---------------------------------------------------------------
  //For tests
  //---------------------------------------------------------------

  server.get('/test', async (req, res) => {
    res.json({message: 'pass!'})
  })

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });

});

module.exports = app;