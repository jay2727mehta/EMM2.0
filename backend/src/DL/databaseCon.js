const { Client } = require("pg");

require('dotenv').config(); 

const clientConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10), // Convert to number
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
}

function handleClientError(error) {
  console.error("Unexpected error in PostgreSQL client:", error.message);
  connectToDatabase();
}

connectToDatabase();

module.exports = client;
