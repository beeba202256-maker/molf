const { sendResponse } = require("../../utils/apiResponse");
const authService = require("./auth.service");

const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    return sendResponse(res, 201, { success: true, data, message: "Registered" });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    return sendResponse(res, 200, { success: true, data, message: "Logged in" });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
