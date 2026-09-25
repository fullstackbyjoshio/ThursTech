import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Gates the /admin routes in the UI. This is a UX convenience only — the
 * real security boundary is Supabase Row Level Security on every table, so
 * the database stays protected even if this check is somehow bypassed.
 */
export default function ProtectedRoute({ children }) {
  const { session, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-navy-700/50">Checking access...</div>;
  }
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <p className="font-display font-bold text-xl mb-2">Not authorized</p>
          <p className="text-sm text-navy-700/60">This account does not have admin access to THURSTECH's dashboard.</p>
        </div>
      </div>
    );
  }
  return children;
}
