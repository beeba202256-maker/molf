const axios = require("axios");
const prisma = require("../../config/prisma");
const env = require("../../config/env");
const AppError = require("../../utils/appError");

const mapMovieInput = (input) => ({
  ...input,
  releaseDate: input.releaseDate ? new Date(input.releaseDate) : undefined,
});

const getMovies = async ({ page = 1, limit = 10, search = "", minRating }) => {
  const skip = (page - 1) * limit;
  const where = {
    ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    ...(minRating ? { rating: { gte: Number(minRating) } } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.movie.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.movie.count({ where }),
  ]);

  return { items, meta: { page, limit, total } };
};

const getMovieById = async (id) => {
  const movie = await prisma.movie.findUnique({ where: { id } });
  if (!movie) throw new AppError("Movie not found", 404);
  return movie;
};

const createMovie = async (payload) => prisma.movie.create({ data: mapMovieInput(payload) });

const updateMovie = async (id, payload) => {
  await getMovieById(id);
  return prisma.movie.update({
    where: { id },
    data: mapMovieInput(payload),
  });
};

const deleteMovie = async (id) => {
  await getMovieById(id);
  await prisma.movie.delete({ where: { id } });
};

const getTrendingMovies = async () => {
  const ttlMs = env.trendingTtlMinutes * 60 * 1000;
  const freshThreshold = new Date(Date.now() - ttlMs);
  const cached = await prisma.movie.findMany({
    where: { source: "TMDB", updatedAt: { gte: freshThreshold } },
    take: 20,
    orderBy: { updatedAt: "desc" },
  });

  if (cached.length > 0) return cached;
  if (!env.tmdbApiKey) return [];

  const response = await axios.get(`${env.tmdbBaseUrl}/trending/movie/day`, {
    params: { api_key: env.tmdbApiKey },
    timeout: 10000,
  });

  const results = response.data?.results || [];
  for (const movie of results.slice(0, 20)) {
    await prisma.movie.upsert({
      where: { externalId: String(movie.id) },
      update: {
        title: movie.title,
        overview: movie.overview || "No overview available.",
        releaseDate: movie.release_date ? new Date(movie.release_date) : new Date(),
        rating: Number(movie.vote_average || 0),
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        source: "TMDB",
      },
      create: {
        externalId: String(movie.id),
        title: movie.title,
        overview: movie.overview || "No overview available.",
        releaseDate: movie.release_date ? new Date(movie.release_date) : new Date(),
        rating: Number(movie.vote_average || 0),
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        source: "TMDB",
      },
    });
  }

  return prisma.movie.findMany({
    where: { source: "TMDB" },
    take: 20,
    orderBy: { updatedAt: "desc" },
  });
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getTrendingMovies,
};
