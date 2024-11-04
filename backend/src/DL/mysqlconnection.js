const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Neilsoft@100",
  database: "solar",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function connectToDatabase() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      connectToDatabase();
      return;
    }

    console.log("Connected to MySQL database");
    connection.release();
  });
}

pool.on("error", (err) => {
  console.error("Unexpected MySQL error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    connectToDatabase();
  }
});

connectToDatabase();

process.on("SIGINT", () => {
  pool.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection pool:", err);
    } else {
      console.log("MySQL connection pool closed");
    }
    process.exit();
  });
});

module.exports = pool;
