const express = require("express");
const { updateProfile, getCurrentUser } = require("../controllers/user");
const authorize = require("../middlewares/auth");

const router = express.Router();

router.get("/me", authorize, getCurrentUser);
router.patch("/me", authorize, updateProfile);

module.exports = router;
