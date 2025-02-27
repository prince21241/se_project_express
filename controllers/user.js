const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  ServerError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.send({ token });
  } catch (err) {
    if (
      err.message.includes("Incorrect email") ||
      err.message.includes("Incorrect password")
    ) {
      return next(new UnauthorizedError("Incorrect email or password"));
    }
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password, name, avatar } = req.body;
    if (!email || !password || !name || !avatar) {
      throw new BadRequestError("All data required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError("This email already exists");
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name, avatar });
    res
      .status(201)
      .send({ email: user.email, name: user.name, avatar: user.avatar });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data"));
    }
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      () => new NotFoundError("Requested resource not found")
    );
    res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid data"));
    }
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    ).orFail(() => new NotFoundError("Requested resource not found"));
    res.send({ name: user.name, avatar: user.avatar });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Validation failed"));
    }
    next(err);
  }
};

module.exports = { createUser, getUser, login, updateUser };
