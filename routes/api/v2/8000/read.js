var port = 8000;

const express = require("express");

const router = express.Router();

const readAPI = require("../../../../controllers/api/v2/" + port + "/readData");

console.log("In " + port + "read router ");

//Read the value in file system for a particular key
router.get("/:key", readAPI.read_data);

module.exports = router;
