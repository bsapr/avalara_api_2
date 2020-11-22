const fs = require("fs");
const filepath = "dataStorage/lookup/data.csv";
const csv = require("csv-parser");
module.exports.write_data = function (req, res) {
  //Scanning the port lookup file in order to perform the write operations in each port's filesystem so that we can achieve synchronization amongs all ports' file system.
  fs.createReadStream(filepath)
    .on("error", () => {
      // handle error
      return res.json(404, {
        message: "Internal server error",
      });
    })

    .pipe(csv())
    .on("data", (row) => {
      let stream = fs.createWriteStream(
        "dataStorage/" + row.port + "/data.csv",
        {
          flags: "a",
        }
      );
      stream.write(req.body.key + "," + req.body.value + "\n");
      stream.end();
    })

    .on("end", () => {
      return res.json(200, {
        message: "Write operation has been done successfully",
      });
    });
};
