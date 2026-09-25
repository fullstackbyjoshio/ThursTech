import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import StatusBadge from "../../components/ui/StatusBadge";

export const STATUS_OPTIONS = [
  "New", "Contacted", "Assessment Scheduled", "Quotation Sent",
  "Approved", "In Progress", "Completed", "Cancelled",
];

/**
 * Generic lead-management table shared by Quote / Repair / Service Requests.
 * Pass the Supabase table name and which columns to render as a summary.
 */
export default function LeadsTable({ table, columns }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeId, setActiveId] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    if (!error && data) setRows(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  async function updateStatus(id, status) {
    await supabase.from(table).update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    load();
  }

  async function saveNote(id) {
    await supabase.from(table).update({ admin_notes: noteDraft, updated_at: new Date().toISOString() }).eq("id", id);
    setActiveId(null);
    load();
  }

  async function remove(id) {
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    await supabase.from(table).delete().eq("id", id);
    load();
  }

  const filtered = rows.filter((r) => {
    const matchesStatus = statusFilter === "All" || (r.status || "New").toLowerCase() === statusFilter.toLowerCase();
    const haystack = JSON.stringify(r).toLowerCase();
    const matchesSearch = !search || haystack.includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input max-w-xs"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input max-w-[200px]">
          <option>All</option>
          {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-navy-700/50">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-navy-700/50 border border-dashed border-silver-300 p-8 text-center">No records found.</p>
      ) : (
        <div className="overflow-x-auto border border-silver-200">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-silver-100 text-left">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>
                ))}
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-t border-silver-200 align-top">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">{row[c.key] || "—"}</td>
                  ))}
                  <td className="px-4 py-3">
                    <select
                      value={row.status || "New"}
                      onChange={(e) => updateStatus(row.id, e.target.value)}
                      className="text-xs border border-silver-300 px-2 py-1"
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <div className="mt-1">
                      <StatusBadge status={row.status || "New"} />
                    </div>
                  </td>
                  <td className="px-4 py-3 min-w-[180px]">
                    {activeId === row.id ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          className="input text-xs"
                          rows={2}
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button onClick={() => saveNote(row.id)} className="text-xs font-semibold text-blue-600">Save</button>
                          <button onClick={() => setActiveId(null)} className="text-xs text-navy-700/50">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setActiveId(row.id); setNoteDraft(row.admin_notes || ""); }}
                        className="text-xs text-left text-navy-700/70 hover:text-blue-600"
                      >
                        {row.admin_notes ? row.admin_notes : "+ Add note"}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-navy-700/50 whitespace-nowrap">
                    {row.created_at ? new Date(row.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => remove(row.id)} className="text-xs text-red-600 hover:underline">Delete</button>
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
