const express = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const movieRoutes = require("../modules/movie/movie.routes");
const favoriteRoutes = require("../modules/favorite/favorite.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});

router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/favorites", favoriteRoutes);

module.exports = router;
