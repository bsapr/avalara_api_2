var port = 8000;
const express = require("express");

const router = express.Router();

const writeAPI = require("../../../../controllers/api/v2/" +
  port +
  "/write_data");

console.log("In " + port + "insert router ");

// doctor can check reports on status basis after JWT is verified
router.post("/", writeAPI.write_data);

module.exports = router;
