const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const NotFoundError = require("../utils/errors/NotFoundError");

// Add an empty line here to satisfy ESLint's `newline-after-import` rule

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res, next) => {
  // Ensure `next` is included properly
  next(new NotFoundError("Router not Found"));
});

module.exports = router;
