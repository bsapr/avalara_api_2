const express = require("express");

const router = express.Router();

const writeAPI = require("../../../../controllers/api/v2/" +
  port +
  "/write_data");

console.log(port + " insert router ");

// Router for putting key value in file system
router.post("/", writeAPI.write_data);

module.exports = router;
