const express = require("express");
const mongoose = require("mongoose");
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
app.use(requestLogger);
app.use(express.json());
app.use(errorHandler);
app.use(errors());

/* Temporary Middleware
app.use((req, res, next) => {
  req.user = {
    _id: "6712607bf104d7baf29317f3",
  };
  next();
}); */

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
