const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const authMiddleware = require("../middlewares/auth");

// Public Route
router.get("/", getItems);

// Protected Routes
router.post("/", authMiddleware, createItem);
router.delete("/:itemId", authMiddleware, deleteItem);
router.put("/:itemId/likes", authMiddleware, likeItem);
router.delete("/:itemId/likes", authMiddleware, dislikeItem);

module.exports = router;
