const { sendResponse } = require("../../utils/apiResponse");
const movieService = require("./movie.service");

const getMovies = async (req, res, next) => {
  try {
    const data = await movieService.getMovies({
      page: Number(req.query.page || 1),
      limit: Number(req.query.limit || 10),
      search: req.query.search || "",
      minRating: req.query.minRating,
    });
    return sendResponse(res, 200, { success: true, data });
  } catch (error) {
    return next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const data = await movieService.getMovieById(req.params.id);
    return sendResponse(res, 200, { success: true, data });
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const data = await movieService.createMovie(req.body);
    return sendResponse(res, 201, { success: true, data, message: "Movie created" });
  } catch (error) {
    return next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const data = await movieService.updateMovie(req.params.id, req.body);
    return sendResponse(res, 200, { success: true, data, message: "Movie updated" });
  } catch (error) {
    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    await movieService.deleteMovie(req.params.id);
    return sendResponse(res, 200, { success: true, data: null, message: "Movie deleted" });
  } catch (error) {
    return next(error);
  }
};

const getTrending = async (req, res, next) => {
  try {
    const data = await movieService.getTrendingMovies();
    return sendResponse(res, 200, { success: true, data });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getTrending,
};
