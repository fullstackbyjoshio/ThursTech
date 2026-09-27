import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../components/ui/Toast";
import Button from "../components/ui/button-1";
import HoldActionButton from "../components/ui/HoldActionButton";
import { Plus, Trash2, X } from "lucide-react";

export default function FAQs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      if (data) setItems(data);
    } catch (error) {
      console.error("Failed to load FAQs:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function togglePublished(item) {
    setUpdatingId(item.id);
    try {
      const { data, error } = await supabase.from("faqs").update({ published: !item.published }).eq("id", item.id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("FAQ was not found or could not be updated.");
      toast.success("Item updated successfully!");
      await load();
    } catch (error) {
      console.error("Failed to update FAQ:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  async function remove(id) {
    setDeletingId(id);
    try {
      const { data, error } = await supabase.from("faqs").delete().eq("id", id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("FAQ was not found or could not be deleted.");
      toast.success("Item deleted successfully!");
      await load();
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">FAQs</h1>
          <p className="text-sm text-navy-700/60">Manage the questions shown on the public FAQ page.</p>
        </div>
        <button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-blue-700">
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-navy-700/50">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-navy-700/50 border border-dashed border-silver-300 p-8 text-center">No FAQs yet.</p>
      ) : (
        <div className="grid gap-3">
          {items.map((f) => (
            <div key={f.id} className="bg-white border border-silver-200 p-4 flex justify-between items-start gap-4">
              <div>
                <p className="font-semibold text-sm">{f.question}</p>
                <p className="text-sm text-navy-700/60 mt-1">{f.answer}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button disabled={updatingId === f.id} onClick={() => togglePublished(f)} className={`text-xs px-2 py-1 border disabled:opacity-50 ${f.published ? "bg-green-50 border-green-600 text-green-700" : "border-silver-300 text-navy-700/50"}`}>
                  {f.published ? "Published" : "Draft"}
                </button>
                <HoldActionButton loading={deletingId === f.id} disabled={Boolean(deletingId)} onConfirm={() => remove(f.id)} className="!p-1 !text-navy-700/40 hover:!text-red-600" aria-label="Hold to delete FAQ"><Trash2 size={15} /></HoldActionButton>
              </div>
            </div>
          ))}
        </div>
      )}

      {adding && <FaqForm onClose={() => setAdding(false)} onSaved={() => { setAdding(false); load(); }} nextOrder={items.length} />}
    </div>
  );
}

function FaqForm({ onClose, onSaved, nextOrder }) {
  const [form, setForm] = useState({ question: "", answer: "", category: "", published: true, sort_order: nextOrder });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from("faqs").insert([form]).select("id").single();
      if (error) throw error;
      if (!data) throw new Error("No FAQ was returned after saving.");
      toast.success("Item created successfully!");
      onSaved();
    } catch (error) {
      console.error("Failed to create FAQ:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-navy-950/60 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white max-w-md w-full p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">Add FAQ</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </div>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-navy-800 mb-1.5">Question</span>
          <input required className="input" value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} />
        </label>
        <label className="block mb-6">
          <span className="block text-sm font-medium text-navy-800 mb-1.5">Answer</span>
          <textarea required rows={3} className="input" value={form.answer} onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))} />
        </label>
        <Button type="submit" loading={isSubmitting} className="w-full">Save FAQ</Button>
      </form>
    </div>
  );
}
