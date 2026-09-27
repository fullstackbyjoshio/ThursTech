import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../components/ui/Toast";
import StatusBadge from "../components/ui/StatusBadge";

/**
 * A unified, read-only view of every customer who has requested a quote,
 * repair or service — pulled from all three lead tables and merged, so
 * admin staff do not have to check three separate screens to find someone.
 */
export default function Customers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [quoteResult, repairResult, serviceResult] = await Promise.all([
          supabase.from("quote_requests").select("*"),
          supabase.from("repair_requests").select("*"),
          supabase.from("service_requests").select("*"),
        ]);
        const { data: quoteData, error: quoteError } = quoteResult;
        const { data: repairData, error: repairError } = repairResult;
        const { data: serviceData, error: serviceError } = serviceResult;

        const errors = [quoteError, repairError, serviceError].filter(Boolean);
        errors.forEach((error) => console.error("Failed to load customer requests:", error));
        if (errors.length) toast.error(`Operation failed: ${errors[0].message}`);

        const merged = [
          ...(quoteData || []).map((r) => ({ ...r, source: "Quote Request", request: r.service_type })),
          ...(repairData || []).map((r) => ({ ...r, source: "Repair Request", request: r.problem })),
          ...(serviceData || []).map((r) => ({ ...r, source: "Service Request", request: r.service_type })),
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setRows(merged);
      } catch (error) {
        console.error("Failed to load customer requests:", error);
        toast.error(`Operation failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = rows.filter((r) => !search || JSON.stringify(r).toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-1">Customers / Leads</h1>
      <p className="text-sm text-navy-700/80 mb-6">Every enquiry across quote, repair and service requests.</p>

      <input placeholder="Search by name, phone, email, location..." value={search} onChange={(e) => setSearch(e.target.value)} className="input max-w-md mb-5" />

      {loading ? (
        <p className="text-sm text-navy-700/80">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-navy-700/80 border border-dashed border-silver-300 p-8 text-center">No customer records yet.</p>
      ) : (
        <div className="overflow-x-auto border border-silver-200 bg-white">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-silver-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone / WhatsApp</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Request</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={`${r.source}-${r.id}`} className="border-t border-silver-200">
                  <td className="px-4 py-3 font-medium">{r.customer_name || "—"}</td>
                  <td className="px-4 py-3">{r.phone || r.whatsapp || "—"}</td>
                  <td className="px-4 py-3">{r.email || "—"}</td>
                  <td className="px-4 py-3 text-xs text-navy-700/80">{r.source}</td>
                  <td className="px-4 py-3">{r.request || "—"}</td>
                  <td className="px-4 py-3">{r.location || "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status || "New"} /></td>
                  <td className="px-4 py-3 text-xs text-navy-700/80 whitespace-nowrap">
                    {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
