const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = validate;
