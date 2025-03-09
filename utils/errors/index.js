const NotFoundError = require("./NotFoundError");
const UnauthorizedError = require("./UnauthorizedError");
const BadRequestError = require("./BadRequestError");
const ConflictError = require("./ConflictError");
const ForbiddenError = require("./ForbiddenError");
const InternalServerError = require("./InternalServerError");

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
};
