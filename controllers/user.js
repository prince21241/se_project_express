const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  SERVER_ERROR_STATUS_CODE,
  CONFLICT_STATUS_CODE,
  UNAUTHORIZED_STATUS,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res(BAD_REQUEST_STATUS_CODE).send({
      message: "Email and password are required",
    });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (
        err.message.includes("Incorrect email") ||
        err.message.includes("Incorrect password")
      ) {
        return res(UNAUTHORIZED_STATUS).send({
          message: "incorrect email or password ",
        });
      }
      return res(SERVER_ERROR_STATUS_CODE).send({
        message: "An error has occured on the server",
      });
    });
};

const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;
  if (!email || !password || !name || !avatar) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ message: "All data required" });
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(CONFLICT_STATUS_CODE)
          .send({ message: "This email already exists" });
      }
      return bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({
            email,
            password: hash,
            name,
            avatar,
          })
        )
        .then((user) => {
          res
            .status(201)
            .send({ email: user.email, name: user.name, avatar: user.avatar });
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid data" });
      }
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      const { _id, email, name, avatar } = user;
      res.send({
        _id,
        email,
        name,
        avatar,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid data" });
      }
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then(() => res.send({ name, avatar }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Validation failed" });
      }
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { createUser, getUser, login, updateUser };
