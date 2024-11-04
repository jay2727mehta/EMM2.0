const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "info", // You can set the log level
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" }), // Save logs to file
  ],
});

module.exports = logger;
