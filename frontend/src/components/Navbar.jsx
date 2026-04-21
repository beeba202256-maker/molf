import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold text-cyan-400">
          Morf Movies
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-slate-200 hover:text-cyan-300">
                Favorites
              </Link>
              {user?.role === 'ADMIN' && (
                <Link to="/admin" className="text-slate-200 hover:text-cyan-300">
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="rounded-md bg-rose-600 px-3 py-1 text-white hover:bg-rose-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="rounded-md bg-cyan-600 px-3 py-1 text-white hover:bg-cyan-500"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
