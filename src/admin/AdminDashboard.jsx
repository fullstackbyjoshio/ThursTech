import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../components/ui/Toast";
import StatCard from "./components/StatCard";

const TABLES = [
  { key: "quote_requests", label: "Quote Requests" },
  { key: "repair_requests", label: "Repair Requests" },
  { key: "service_requests", label: "Service Requests" },
  { key: "products", label: "Products" },
  { key: "projects", label: "Projects" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const results = {};
      let pendingTotal = 0;
      let completedTotal = 0;
      const errors = [];

      for (const t of TABLES) {
        const { count, error } = await supabase.from(t.key).select("*", { count: "exact", head: true });
        if (error) {
          console.error(`Failed to load ${t.label} count:`, error);
          errors.push(error);
        }
        results[t.key] = count ?? 0;
      }

      for (const t of ["quote_requests", "repair_requests", "service_requests"]) {
        const { count: p, error: pendingError } = await supabase
          .from(t)
          .select("*", { count: "exact", head: true })
          .not("status", "in", "(Completed,Cancelled)");
        const { count: c, error: completedError } = await supabase.from(t).select("*", { count: "exact", head: true }).eq("status", "Completed");
        if (pendingError) {
          console.error(`Failed to load pending ${t} count:`, pendingError);
          errors.push(pendingError);
        }
        if (completedError) {
          console.error(`Failed to load completed ${t} count:`, completedError);
          errors.push(completedError);
        }
        pendingTotal += p ?? 0;
        completedTotal += c ?? 0;
      }

      setCounts(results);
      setPending(pendingTotal);
      setCompleted(completedTotal);
      if (errors.length) toast.error(`Operation failed: ${errors[0].message}`);
      setLoading(false);
    }
    load();
  }, []);

  const totalEnquiries = (counts.quote_requests || 0) + (counts.repair_requests || 0) + (counts.service_requests || 0);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-1">Dashboard</h1>
      <p className="text-sm text-navy-700/80 mb-8">Overview of THURSTECH website activity.</p>

      {loading ? (
        <p className="text-sm text-navy-700/80">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Enquiries" value={totalEnquiries} accent />
          <StatCard label="Pending Leads" value={pending} />
          <StatCard label="Completed Requests" value={completed} />
          <StatCard label="Products" value={counts.products || 0} />
          <StatCard label="New Quote Requests" value={counts.quote_requests || 0} />
          <StatCard label="Repair Requests" value={counts.repair_requests || 0} />
          <StatCard label="Service Requests" value={counts.service_requests || 0} />
          <StatCard label="Projects" value={counts.projects || 0} />
        </div>
      )}
    </div>
  );
}
