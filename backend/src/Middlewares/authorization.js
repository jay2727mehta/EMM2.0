const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretPassphrase = "c0mPlexP@ssw0rd!";

const secretKey = crypto
  .createHmac("sha256", secretPassphrase)
  .update("unique_salt_for_application")
  .digest("hex");

JWT_SECRET = secretKey;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const checkRole = (requiredRole) => (req, res, next) => {
  if (req.userRole !== requiredRole) {
    return res.status(403).send({ message: "Forbidden: Insufficient role" });
  }
  next();
};

module.exports = { verifyToken, checkRole };
