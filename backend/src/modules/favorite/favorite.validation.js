const { z } = require("zod");

const movieIdParamSchema = z.object({
  params: z.object({
    movieId: z.string().uuid(),
  }),
});

module.exports = { movieIdParamSchema };
