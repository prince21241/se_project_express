const router = require("express").Router();
const { getUsers } = require("../controllers/user");

router.get("/", getUsers);
router.get("/:userId", () => console.log("GET users by ID"));
router.get("/", () => console.log("POST users"));

module.exports = router;
