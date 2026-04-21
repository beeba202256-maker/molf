const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      data: null,
      message: err.issues.map((i) => i.message).join(", "),
    });
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    data: null,
    message: err.message || "Internal server error",
  });
};

module.exports = errorMiddleware;
