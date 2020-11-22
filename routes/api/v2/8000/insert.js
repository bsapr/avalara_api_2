var port = 8000;
const express = require("express");

const router = express.Router();

const writeAPI = require("../../../../controllers/api/v2/" +
  port +
  "/writeData");

console.log("In " + port + "insert router ");

//Putting key value in file systems
router.post("/", writeAPI.write_data);

module.exports = router;
