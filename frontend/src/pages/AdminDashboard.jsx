import { useEffect, useState } from 'react'
import api from '../api/axios.js'

const initialState = {
  title: '',
  overview: '',
  releaseDate: '',
  rating: 0,
  posterUrl: '',
}

export default function AdminDashboard() {
  const [movies, setMovies] = useState([])
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')

  const loadMovies = async () => {
    try {
      const res = await api.get('/movies', { params: { page: 1, limit: 20 } })
      setMovies(res.data.data.items)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load movies')
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

  const createMovie = async (e) => {
    e.preventDefault()
    try {
      await api.post('/movies', {
        ...form,
        rating: Number(form.rating),
        releaseDate: new Date(form.releaseDate).toISOString(),
      })
      setForm(initialState)
      await loadMovies()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create movie')
    }
  }

  const deleteMovie = async (id) => {
    await api.delete(`/movies/${id}`)
    await loadMovies()
  }

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {error && <p className="text-rose-400">{error}</p>}
      <form onSubmit={createMovie} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <input className="rounded border border-slate-700 bg-slate-950 p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea className="rounded border border-slate-700 bg-slate-950 p-2" placeholder="Overview" value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} required />
        <input className="rounded border border-slate-700 bg-slate-950 p-2" type="date" value={form.releaseDate} onChange={(e) => setForm({ ...form, releaseDate: e.target.value })} required />
        <input className="rounded border border-slate-700 bg-slate-950 p-2" type="number" min="0" max="10" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} required />
        <input className="rounded border border-slate-700 bg-slate-950 p-2" placeholder="Poster URL" value={form.posterUrl} onChange={(e) => setForm({ ...form, posterUrl: e.target.value })} />
        <button type="submit" className="rounded bg-cyan-600 py-2 hover:bg-cyan-500">Create Movie</button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="border-t border-slate-800">
                <td className="p-3">{movie.title}</td>
                <td className="p-3">{movie.rating}</td>
                <td className="p-3">
                  <button type="button" onClick={() => deleteMovie(movie.id)} className="text-rose-400 hover:text-rose-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
