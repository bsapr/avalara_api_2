const express = require("express");
const cookieParser = require("cookie-parser");
const functionHandler = require("./bin/functionalities");
let config = require("config");
const process = require("process");
var argv = require("minimist")(process.argv.slice(2));
var ports = argv["_"];

console.log("printing the arguments ");
console.dir(argv);
console.log(argv["_"].length);
const fs = require("fs");

if (config.util.getEnv("NODE_ENV") == "test") {
  console.log("in if case of Node_env");
  let app = express();
  app.use(express.urlencoded());
  app.use(cookieParser());
  app.listen(8000, function (err) {
    if (err) {
      console.log("Error in running the server:", 8000, " ", err);
    }

    console.log("Test Server is running on port:", 8000);
    app.use("/", require("./routes/api/v2/8000/"));
  });

  module.exports = app;
} else {
  setTimeout(function () {
    let app1 = new Array(ports.length);

    for (let i = 0; i < ports.length; i++) {
      app1[i] = express();
      app1[i].use(express.urlencoded());
      app1[i].use(cookieParser());
      app1[i].listen(ports[i], function (err) {
        if (err) {
          console.log("Error in running the server:", ports[i], " ", err);
        }

        console.log("Server is running on port:", ports[i]);
        app1[i].use("/", require("./routes/api/v2/" + ports[i]));
      });
      // app.use("/", require("./routes/api/v2/" + 8000));
    }
  }, 1000);
}

//Function for copying the files for each port
function copyFile(source, destination, port_number) {
  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.log("Error in copying insert file for ", port_number, " ", err);
    } else {
      let data = fs.readFileSync(destination).toString().split("\n");
      data.splice(0, 0, "var port = " + port_number + " ;");
      let text = data.join("\n");

      fs.writeFile(destination, text, function (err) {
        if (err) return err;
      });
    }
  });
}
portsDirectoryHandler();
//functionHandler.processHandler(ports);
function portsDirectoryHandler() {
  console.log("in ports handler");
  for (let i = 0; i < ports.length; i++) {
    //Routes directory setup for each port
    let routes_dir = "./routes/api/v2/" + ports[i];
    fs.access(routes_dir, (error) => {
      if (error) {
        let stream = fs.createWriteStream("dataStorage/lookup/data.csv", {
          flags: "a",
        });
        stream.write(ports[i] + "\n");
        stream.end();
        // The check succeeded
        fs.mkdir(routes_dir, { recursive: true }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(ports[i], "routes directory successfully created.");
            //Copying  routes files from utils directory for each port directory.
            let index_source = "./utils/routes_reference/index.js";
            let index_destination = "./routes/api/v2/" + ports[i] + "/index.js";
            let insert_source = "./utils/routes_reference/insert.js";
            let insert_destination =
              "./routes/api/v2/" + ports[i] + "/insert.js";
            let read_source = "./utils/routes_reference/read.js";
            let read_destination = "./routes/api/v2/" + ports[i] + "/read.js";
            copyFile(index_source, index_destination, ports[i]);
            copyFile(insert_source, insert_destination, ports[i]);
            copyFile(read_source, read_destination, ports[i]);
          }
        });
      }
    });

    //Controllers directory setup for each port
    let controllers_dir = "./controllers/api/v2/" + ports[i];
    fs.access(controllers_dir, (error) => {
      if (error) {
        // The check succeeded
        fs.mkdir(controllers_dir, { recursive: true }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(
              ports[i],
              "controllers directory successfully created."
            );
            //Controllers files from utils directory for each port directory.
            let read_source = "./utils/controllers_reference/read_data.js";
            let read_destination =
              "./controllers/api/v2/" + ports[i] + "/read_data.js";
            let write_source = "./utils/controllers_reference/write_data.js";
            let write_destination =
              "./controllers/api/v2/" + ports[i] + "/write_data.js";
            copyFile(read_source, read_destination, ports[i]);
            copyFile(write_source, write_destination, ports[i]);
          }
        });
      }
    });

    //Data directory setup for each port
    let data_directory = "./dataStorage/" + ports[i];
    fs.access(data_directory, (error) => {
      if (error) {
        // The check succeeded
        fs.mkdir(data_directory, { recursive: true }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(ports[i], " data directory successfully created.");
            //Copying data files from Port 8000 directory to another port directory.
            let data_source = "./dataStorage/8000/data.csv";
            let data_destination = "./dataStorage/" + ports[i] + "/data.csv";
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
  return 1;
}
