const express = require("express");
const controller = require("./movie.controller");
const validate = require("../../middlewares/validate.middleware");
const { protect, authorize } = require("../../middlewares/auth.middleware");
const { createMovieSchema, updateMovieSchema, idParamSchema } = require("./movie.validation");

const router = express.Router();

router.get("/", controller.getMovies);
router.get("/trending", controller.getTrending);
router.get("/:id", validate(idParamSchema), controller.getMovieById);
router.post("/", protect, authorize("ADMIN"), validate(createMovieSchema), controller.createMovie);
router.put("/:id", protect, authorize("ADMIN"), validate(updateMovieSchema), controller.updateMovie);
router.delete("/:id", protect, authorize("ADMIN"), validate(idParamSchema), controller.deleteMovie);

module.exports = router;
