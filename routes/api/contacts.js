const express = require("express");
const ctrl = require("../../controllers/contacts");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  validation,
  validationUpdate,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.add), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
  validationUpdate(schemas.update),
  ctrlWrapper(ctrl.updateById)
);

router.put(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
