const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");

const addFavorite = async (userId, movieId) => {
  const movie = await prisma.movie.findUnique({ where: { id: movieId } });
  if (!movie) throw new AppError("Movie not found", 404);

  return prisma.favorite.upsert({
    where: { userId_movieId: { userId, movieId } },
    update: {},
    create: { userId, movieId },
    include: { movie: true },
  });
};

const removeFavorite = async (userId, movieId) => {
  const favorite = await prisma.favorite.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });
  if (!favorite) throw new AppError("Favorite not found", 404);

  await prisma.favorite.delete({ where: { id: favorite.id } });
};

const getMyFavorites = async (userId) =>
  prisma.favorite.findMany({
    where: { userId },
    include: { movie: true },
    orderBy: { id: "desc" },
  });

module.exports = { addFavorite, removeFavorite, getMyFavorites };
