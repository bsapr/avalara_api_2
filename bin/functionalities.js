const fs = require("fs");
module.exports.processHandler = function (ports) {
  for (let i = 0; i < ports.length; i++) {
    let dir = "../routes/api/v2/" + ports[i];
    fs.access(dir, (error) => {
      if (error) {
        // The check succeeded
        fs.mkdir(dir, { recursive: true }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(ports[i], " directory successfully created.");
            //Copying index files from Port 8000 directory to another port directory.
            let index_source = "../routes/api/v2/8000/index.js";
            let index_destination =
              "../routes/api/v2/" + ports[i] + "/index.js";
            let insert_source = "../routes/api/v2/8000/insert.js";
            let insert_destination =
              "../routes/api/v2/" + ports[i] + "/insert.js";
            let read_source = "../routes/api/v2/8000/read.js";
            let read_destination = "../routes/api/v2/" + ports[i] + "/read.js";
            fs.copyFile(index_source, index_destination, (err) => {
              if (err) {
                console.log(
                  "Error in copying index file for ",
                  ports[i],
                  " ",
                  err
                );
              }
            });
            fs.copyFile(insert_source, insert_destination, (err) => {
              if (err) {
                console.log(
                  "Error in copying insert file for ",
                  ports[i],
                  " ",
                  err
                );
              }
            });
            fs.copyFile(read_source, read_destination, (err) => {
              if (err) {
                console.log(
                  "Error in copying destination file for ",
                  ports[i],
                  " ",
                  err
                );
              }
            });
          }
        });
      }
    });

    let data_directory = "../dataStorage/" + ports[i];
    fs.access(data_directory, (error) => {
      if (error) {
        // The check succeeded
        fs.mkdir(data_directory, { recursive: true }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(ports[i], " data directory successfully created.");
            //Copying data files from Port 8000 directory to another port directory.
            let data_source = "../dataStorage/8000/data.json";
            let data_destination = "../dataStorage/" + ports[i] + "/data.json";
            fs.copyFile(data_source, data_destination, (err) => {
              if (err) {
                console.log(
                  "Error in copying data file for ",
                  ports[i],
                  " ",
                  err
                );
              }
            });
          }
        });
      }
    });
  }
};
