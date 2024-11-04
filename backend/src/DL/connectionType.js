const { Model } = require("sequelize");
const { createConnection } = require("typeorm");

const connectToDatabase = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "192.168.1.154",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [],
    });

    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
