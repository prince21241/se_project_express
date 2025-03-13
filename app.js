const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, Segments, errors } = require("celebrate");
const mainRouter = require("./routes/index");
const { login } = require("./controllers/user");
const { createUser } = require("./controllers/user");
const cors = require("cors");

const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());
// Middleware setup
app.use(express.json());

// Request logger should come before routes
app.use(requestLogger);

// Validation schemas
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
    avatar: Joi.string().uri().required(), // Added avatar validation
  }),
};

// Crash testing route
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Routes with validation
app.post("/signin", celebrate(authSchema), login);
app.post("/signup", celebrate(userSchema), createUser);
app.use("/", mainRouter);

// Error handling middleware
app.use(errorLogger); // Error logger should come after routes
app.use(errors()); // Celebrate error handler
app.use(errorHandler); // Custom error handler after celebrate's

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
