const router = require("express").Router();
const { getUsers } = require("../controllers/user");

// Route to handle GET request for all users
router.get("/", getUsers);

// Route to handle GET request for a specific user by ID
router.get("/:userId", (req, res) => {
  console.log("GET users by ID");
  res.send(`GET user with ID: ${req.params.userId}`);
});

// Route to handle POST request to create a new user
router.post("/", (req, res) => {
  console.log("POST users");
  res.send("User created");
});

module.exports = router;
