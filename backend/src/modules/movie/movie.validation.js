const { z } = require("zod");

const moviePayload = z.object({
  title: z.string().min(1),
  overview: z.string().min(1),
  releaseDate: z.string().datetime(),
  rating: z.number().min(0).max(10),
  posterUrl: z.string().url().optional().or(z.literal("")),
});

const createMovieSchema = z.object({ body: moviePayload });

const updateMovieSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: moviePayload.partial(),
});

const idParamSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});

module.exports = { createMovieSchema, updateMovieSchema, idParamSchema };
