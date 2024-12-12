const express = require("express");
const router = express.Router();
const { updateProfile, getCurrentUser } = require("../controllers/user");
const authorize = require("../middlewares/auth");

router.get("/me", authorize, getCurrentUser);
router.patch("/me", authorize, updateProfile);

module.exports = router;
