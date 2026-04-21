import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function MovieDetailsPage() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [movie, setMovie] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`)
        setMovie(res.data.data)
      } catch {
        setMessage('Unable to load movie details')
      }
    }
    fetchMovie()
  }, [id])

  const addFavorite = async () => {
    try {
      await api.post(`/favorites/${id}`)
      setMessage('Added to favorites')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add favorite')
    }
  }

  if (!movie) return <p className="text-slate-300">Loading...</p>

  return (
    <section className="grid gap-6 md:grid-cols-[280px_1fr]">
      <img
        src={movie.posterUrl || 'https://via.placeholder.com/400x600?text=No+Poster'}
        alt={movie.title}
        className="w-full rounded-xl border border-slate-800"
      />
      <div>
        <h1 className="mb-2 text-3xl font-bold">{movie.title}</h1>
        <p className="mb-4 text-slate-300">{movie.overview}</p>
        <p className="text-slate-400">Release: {new Date(movie.releaseDate).toDateString()}</p>
        <p className="mb-4 text-slate-400">Rating: {movie.rating}</p>
        {isAuthenticated && (
          <button
            type="button"
            onClick={addFavorite}
            className="rounded-md bg-cyan-600 px-4 py-2 hover:bg-cyan-500"
          >
            Add to Favorites
          </button>
        )}
        {message && <p className="mt-3 text-cyan-300">{message}</p>}
      </div>
    </section>
  )
}
