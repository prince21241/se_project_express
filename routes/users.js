const { celebrate, Joi, Segments } = require("celebrate");
const express = require("express");
const { updateUser, getUser } = require("../controllers/user");
const authorize = require("../middlewares/auth");

const router = express.Router();

// Validation
const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().uri().required(), // Ensuring avatar is a valid URL
  }),
};

// Routes
router.get("/me", authorize, getUser);
router.patch("/me", authorize, celebrate(updateUserSchema), updateUser);

module.exports = router;
