import { useEffect, useState } from 'react'
import api from '../api/axios.js'
import MovieCard from '../components/MovieCard.jsx'
import useDebounce from '../hooks/useDebounce.js'

export default function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [trendingRes, moviesRes] = await Promise.all([
          api.get('/movies/trending'),
          api.get('/movies', { params: { search: debouncedSearch, page: 1, limit: 12 } }),
        ])
        const trending = trendingRes.data.data || []
        const catalog = moviesRes.data.data.items || []
        setMovies(debouncedSearch ? catalog : [...trending, ...catalog])
        setError('')
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load movies')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [debouncedSearch])

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Trending & Movie Catalog</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search movies..."
        className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2"
      />
      {loading && <p className="text-slate-300">Loading movies...</p>}
      {error && <p className="text-rose-400">{error}</p>}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={`${movie.id}-${movie.title}`} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
