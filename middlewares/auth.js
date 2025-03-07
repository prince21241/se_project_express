const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../utils/errors/UnauthorizedError"); // Custom error class

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("AUTHORIZATION REQUIRED"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("INVALID TOKEN"));
  }

  return next();
};

module.exports = auth;
