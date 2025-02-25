const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, Segments, errors } = require("celebrate");
const mainRouter = require("./routes/index");
const { login } = require("./controllers/user");
const { createUser } = require("./controllers/user");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(errorLogger);
app.use(express.json());

//Validation
const authSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

const userSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

//Crash testing
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

//Routes with validation
app.post("/signin", celebrate(authSchema), login);
app.post("/signup", celebrate(userSchema), createUser);

app.use("/", mainRouter);

//Error handler placed after the routes as per comments in the code review
app.use(requestLogger);
app.use(errorHandler);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
