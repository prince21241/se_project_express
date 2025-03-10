const ClothingItem = require("../models/clothingItem");

const {
  BadRequestError,
  NotFoundError,
  ServerError,
  ForbiddenError,
} = require("../utils/errors");

const getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    return res.send(items);
  } catch (err) {
    return next(new ServerError("An error has occurred on the server"));
  }
};

const createItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const item = await ClothingItem.create({
      name,
      weather,
      imageUrl,
      owner: req.user._id,
    });
    return res.status(201).send(item);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return next(new BadRequestError("Invalid data"));
    }
    return next(new ServerError("An error has occurred on the server"));
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await ClothingItem.findById(itemId).orFail();

    if (item.owner.toString() !== req.user._id) {
      return next(
        new ForbiddenError("You are not authorized to delete this item")
      );
    }

    await ClothingItem.deleteOne({ _id: itemId });
    return res.send({ message: "Item successfully deleted" });
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return next(new BadRequestError("Invalid data"));
    }
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Requested resource not found"));
    }
    return next(new ServerError("An error has occurred on the server"));
  }
};

const likeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail();
    return res.send(item);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return next(new BadRequestError("Invalid data"));
    }
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Requested resource not found"));
    }
    return next(new ServerError("An error has occurred on the server"));
  }
};

const dislikeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail();
    return res.send(item);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return next(new BadRequestError("Invalid data"));
    }
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Requested resource not found"));
    }
    return next(new ServerError("An error has occurred on the server"));
  }
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
