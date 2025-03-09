const { celebrate, Joi, Segments } = require("celebrate");
const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const authMiddleware = require("../middlewares/auth");

// Validation schemas
const itemIdSchema = {
  [Segments.PARAMS]: Joi.object({
    itemId: Joi.string().hex().length(24).required(),
  }),
};

const createItemSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    imageUrl: Joi.string().uri().required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
};

// Public Route
router.get("/", getItems);

// Protected Routes with validation
router.post("/", authMiddleware, celebrate(createItemSchema), createItem);
router.delete("/:itemId", authMiddleware, celebrate(itemIdSchema), deleteItem);
router.put("/:itemId/likes", authMiddleware, celebrate(itemIdSchema), likeItem);
router.delete(
  "/:itemId/likes",
  authMiddleware,
  celebrate(itemIdSchema),
  dislikeItem
);

module.exports = router;
