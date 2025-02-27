const router = require("express").Router();
const { NOT_FOUND_STATUS_CODE } = require("../utils/errors");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const NotFoundError = require("../utils/errors/NotFoundError");

// Add an empty line here to satisfy ESLint's `newline-after-import` rule

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  next(new NotFoundError("Router not Found"));
});

module.exports = router;
