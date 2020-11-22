const express = require("express");

const router = express.Router();
console.log("index router loaded");

// insert router
router.use("/set", require("./insert"));
// read router
router.use("/read", require("./read"));

module.exports = router;
