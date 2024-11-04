

const fs = require('fs');
const path = require('path');
const express = require("express");
const cluster = require('cluster');  // Cluster module
const os = require('os');            // OS module to get CPU cores
const energy = require("./src/controller/energy.js");
const energyMeter = require("./src/controller/energyMeter.js");
const solar = require("./src/controller/solar.js");
const EmailService = require("./src/controller/emailController.js");
const controlunits = require("./src/controller/controllunits.js");
const nodestate = require("./src/controller/nodestatusController.js");
const employeeService = require("./src/controller/employeeController.js");
const authService = require("./src/controller/authController.js");
const authMiddleware = require("./src/Middlewares/authorization.js");
const nodeGateway = require("./src/controller/nodeGatewayController.js");
const graphController = require("./src/controller/graphController.js");
const graphDataController = require("./src/controller/graphDataController.js");
 
require("dotenv").config();

const cors = require("cors");
const numCPUs = os.cpus().length; // Get number of CPU cores

console.log(numCPUs);

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // If a worker dies, restart it
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Forking a new worker...');
    cluster.fork(); // Restart the worker
  });

} else {


  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );


  app.use("/auth", authService);
  const port =3008;
  app.use("/energy", energy);
  app.use("/energymeter", energyMeter);
  app.use("/solar", solar);
  app.use("/emailService", EmailService);
  app.use("/contolunits", controlunits);
  app.use("/nodestatus", nodestate);
  app.use("/employee", employeeService);
  app.use("/configuration", nodeGateway);
  app.use("/graphservice", graphController);
  app.use("/graphDataservice", graphDataController);


  // Start the server
  app.listen(port, () => {
    console.log(`Worker process ${process.pid} is running on http://192.168.1.100:${port}`);
  });
}
