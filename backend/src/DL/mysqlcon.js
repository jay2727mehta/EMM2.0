const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Neilsoft@100",
  database: "solar",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
  acquireTimeout: 10000,
  timeout: 10000,
});

function performDatabaseOperations() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
    connection.release();
  });
}

setInterval(() => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL for keep-alive:", err);
      return;
    }

    connection.ping((pingErr) => {
      if (pingErr) {
        console.error("Error pinging MySQL:", pingErr);
      } else {
        console.log("Pinged MySQL successfully");
      }
      connection.release();
    });
  });
}, 60000);

pool.on("error", (err) => {
  console.error("Unexpected MySQL pool error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    performDatabaseOperations();
  }
});

performDatabaseOperations();

process.on("SIGINT", () => {
  pool.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection pool:", err);
    }
    process.exit();
  });
});

module.exports = pool;
