import { useEffect, useState } from 'react'
import api from '../api/axios.js'
import MovieCard from '../components/MovieCard.jsx'

export default function ProfilePage() {
  const [favorites, setFavorites] = useState([])
  const [error, setError] = useState('')

  const loadFavorites = async () => {
    try {
      const res = await api.get('/favorites/me')
      setFavorites(res.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch favorites')
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  const removeFavorite = async (movieId) => {
    await api.delete(`/favorites/${movieId}`)
    await loadFavorites()
  }

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">My Favorites</h1>
      {error && <p className="mb-4 text-rose-400">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((favorite) => (
          <MovieCard
            key={favorite.id}
            movie={favorite.movie}
            action={
              <button
                type="button"
                onClick={() => removeFavorite(favorite.movieId)}
                className="text-sm text-rose-400 hover:text-rose-300"
              >
                Remove
              </button>
            }
          />
        ))}
      </div>
    </section>
  )
}
