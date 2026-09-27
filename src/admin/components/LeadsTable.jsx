import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "../../components/ui/Toast";
import Button from "../../components/ui/button-1";
import HoldActionButton from "../../components/ui/HoldActionButton";
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
  const [savingNoteId, setSavingNoteId] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (data) setRows(data);
    } catch (error) {
      console.error(`Failed to load ${table}:`, error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  async function updateStatus(id, status) {
    setUpdatingStatusId(id);
    try {
      const { data, error } = await supabase.from(table).update({ status, updated_at: new Date().toISOString() }).eq("id", id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Record was not found or could not be updated.");
      toast.success("Item updated successfully!");
      await load();
    } catch (error) {
      console.error(`Failed to update ${table} status:`, error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setUpdatingStatusId(null);
    }
  }

  async function saveNote(id) {
    setSavingNoteId(id);
    try {
      const { data, error } = await supabase.from(table).update({ admin_notes: noteDraft, updated_at: new Date().toISOString() }).eq("id", id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Record was not found or could not be updated.");
      toast.success("Item updated successfully!");
      setActiveId(null);
      await load();
    } catch (error) {
      console.error(`Failed to update ${table} notes:`, error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setSavingNoteId(null);
    }
  }

  async function remove(id) {
    setDeletingId(id);
    try {
      const { data, error } = await supabase.from(table).delete().eq("id", id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Record was not found or could not be deleted.");
      toast.success("Item deleted successfully!");
      await load();
    } catch (error) {
      console.error(`Failed to delete ${table} record:`, error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
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
        <p className="text-sm text-navy-700/80">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-navy-700/80 border border-dashed border-silver-300 p-8 text-center">No records found.</p>
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
                      disabled={updatingStatusId === row.id}
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
                          <Button type="button" loading={savingNoteId === row.id} onClick={() => saveNote(row.id)} className="!px-3 !py-1 !text-xs">Save</Button>
                          <button type="button" onClick={() => setActiveId(null)} className="text-xs text-navy-700/80">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setActiveId(row.id); setNoteDraft(row.admin_notes || ""); }}
                        className="text-xs text-left text-navy-700/80 hover:text-blue-600"
                      >
                        {row.admin_notes ? row.admin_notes : "+ Add note"}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-navy-700/80 whitespace-nowrap">
                    {row.created_at ? new Date(row.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <HoldActionButton loading={deletingId === row.id} disabled={Boolean(deletingId)} onConfirm={() => remove(row.id)} label="Hold to delete record" className="!px-3 !py-1 !text-xs">Delete</HoldActionButton>
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
