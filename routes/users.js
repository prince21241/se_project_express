const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const { updateUser, getUser } = require("../controllers/user");
const authorize = require("../middlewares/auth");
const router = express.Router();

//Validation
const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
};

//Routes
router.get("/me", authorize, getUser);
router.patch("/me", authorize, celebrate(updateUserSchema), updateUser);

module.exports = router;
