import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) return <Navigate to="/auth" replace />
  if (requireAdmin && user?.role !== 'ADMIN') return <Navigate to="/" replace />
  return children
}
