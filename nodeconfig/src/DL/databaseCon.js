const { Client } = require("pg");
// require('dotenv').config();
// const clientConfig = {
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// };




const clientConfig = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
  poolSize:100
};


let client;

async function connectToDatabase() {
  try {
    if (client) {
      await client.end();
      console.log("Closed previous connection.");
    }
    client = new Client(clientConfig);
    await client.connect();
    console.log("Connected to PostgreSQL database through client");
    client.on("error", handleClientError);
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error.message);
    connectToDatabase();
  }
  finally{

  }
}

function handleClientError(error) {
  console.error("Unexpected error in PostgreSQL client:", error.message);
  connectToDatabase();
}

 connectToDatabase();

module.exports = client;
