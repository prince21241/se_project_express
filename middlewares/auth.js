const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const InternalServerError = require("../utils/errors/InternalServerError"); // Custom error class

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new InternalServerError("AUTHORIZATION REQUIRED"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new InternalServerError("INVALID TOKEN"));
  }

  return next();
};

module.exports = auth;
