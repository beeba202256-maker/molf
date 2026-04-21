const { sendResponse } = require("../../utils/apiResponse");
const favoriteService = require("./favorite.service");

const addFavorite = async (req, res, next) => {
  try {
    const data = await favoriteService.addFavorite(req.user.id, req.params.movieId);
    return sendResponse(res, 201, { success: true, data, message: "Added to favorites" });
  } catch (error) {
    return next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    await favoriteService.removeFavorite(req.user.id, req.params.movieId);
    return sendResponse(res, 200, { success: true, data: null, message: "Removed from favorites" });
  } catch (error) {
    return next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const data = await favoriteService.getMyFavorites(req.user.id);
    return sendResponse(res, 200, { success: true, data });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addFavorite, removeFavorite, getMe };
