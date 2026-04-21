const express = require("express");
const controller = require("./favorite.controller");
const { protect } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { movieIdParamSchema } = require("./favorite.validation");

const router = express.Router();

router.post("/:movieId", protect, validate(movieIdParamSchema), controller.addFavorite);
router.delete("/:movieId", protect, validate(movieIdParamSchema), controller.removeFavorite);
router.get("/me", protect, controller.getMe);

module.exports = router;
