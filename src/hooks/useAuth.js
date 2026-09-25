import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Tracks the current Supabase auth session and whether that user is an
 * authorized admin (present in the admin_users table). The database RLS
 * policies are the real enforcement - this hook only drives the UI (e.g.
 * redirecting away from /admin), so never rely on it alone for security.
 */
export function useAuth() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAdmin(currentSession) {
      if (!currentSession) {
        setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", currentSession.user.id)
        .maybeSingle();
      if (!isMounted) return;
      setIsAdmin(Boolean(data) && !error);
    }

    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(data.session ?? null);
      await checkAdmin(data.session);
      setLoading(false);
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      await checkAdmin(newSession);
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return { session, isAdmin, loading, user: session?.user ?? null };
}
