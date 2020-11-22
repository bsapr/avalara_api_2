var port = 8000;
const fs = require("fs");

console.log("in read_date.js controller ");
const csv = require("csv-parser");
const { exit } = require("process");
var os = require("os");
var read_flag = 0;
let read_value = -1;
const path = require("path");
const { doesNotMatch } = require("assert");
module.exports.read_data = function (req, res) {
  const filepath = "dataStorage/" + port + "/data.csv";

  fs.createReadStream(filepath)
    .on("error", () => {
      // handle error
      return res.json(404, {
        message: "Internal server error msg",
      });
    })

    .pipe(csv())
    .on("data", (row) => {
      console.log(row, " ", req.params.key);
      console.log(typeof row.key, " ", typeof req.params.key);
      if (row.key === req.params.key) {
        read_flag = 1;
        read_value = row.value;
        console.log("in if else");
      }
    })

    .on("end", () => {
      //handle end of CSV
      if (read_flag == 0) {
        return res.json(404, {
          message: "No such key exists in data storage",
        });
      } else {
        read_flag = 0;
        return res.json(200, {
          message: "Read operation has been done successfully",
          data: { key: req.params.key, value: read_value },
        });
      }
    });
};
