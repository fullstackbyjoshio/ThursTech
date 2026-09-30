import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const response = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (response.error) {
      console.error("Supabase sign-in response:", {
        data: response.data,
        error: response.error,
        status: response.error.status ?? response.status ?? null,
      });
      setError(response.error.message);
      return;
    }
    navigate("/admin");
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-sm p-8">
        <p className="font-display font-extrabold text-xl text-navy-900 mb-1">THURSTECH</p>
        <p className="text-sm text-navy-700/80 mb-6">Admin sign in</p>

        {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3">{error}</p>}

        <label className="block mb-4">
          <span className="block text-sm font-medium text-navy-800 mb-1.5">Email</span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        </label>
        <label className="block mb-6">
          <span className="block text-sm font-medium text-navy-800 mb-1.5">Password</span>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        </label>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}