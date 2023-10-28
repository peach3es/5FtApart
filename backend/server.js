const express = require("express");
const next = require("next");
const connectMongo = require("./database/conn.js");
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("./database/controller.js");
const {
  getProperties,
  getProperty,
  postProperty,
  putProperty,
  deleteProperty,
} = require("./database/controller.js");

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

  server.get("/api/data", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  // Add your Express middleware and routes here
  //For properties
  server.get("/api/property", (req, res) => {
    getProperties(req, res);
  });

  server.get("/api/property/:propertyID", (req, res) => {
    getProperty(req, res);
  });

  server.post("/api/property", (req, res) => {
    // res.status(200).json({ method: "POST Request" });
    postProperty(req, res);
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

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
