const express = require("express");

const router = express.Router();

const readAPI = require("../../../../controllers/api/v2/" + port + "/readData");

console.log(port + " read router");

// Router for performing read operations in file system.
router.get("/:key", readAPI.read_data);

module.exports = router;
