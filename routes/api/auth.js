const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");
const { validation, authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(schemas.joiEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post(
  "/login",
  validation(schemas.joiLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
