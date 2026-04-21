import { Link } from 'react-router-dom'

export default function MovieCard({ movie, action }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <img
        src={movie.posterUrl || 'https://via.placeholder.com/400x600?text=No+Poster'}
        alt={movie.title}
        className="mb-3 h-72 w-full rounded-lg object-cover"
      />
      <h3 className="line-clamp-1 text-lg font-semibold">{movie.title}</h3>
      <p className="mb-2 text-sm text-slate-400">Rating: {movie.rating}</p>
      <div className="flex items-center justify-between">
        <Link to={`/movies/${movie.id}`} className="text-cyan-400 hover:text-cyan-300">
          Details
        </Link>
        {action}
      </div>
    </article>
  )
}
