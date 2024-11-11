const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/user");

// Route to handle GET request for all users
router.get("/", getUsers);

// Route to handle GET request for a specific user by ID
router.get("/:userId", getUser);

// Route to handle POST request to create a new user
router.post("/", createUser);

module.exports = router;
