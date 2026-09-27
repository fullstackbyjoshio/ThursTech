import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../components/ui/Toast";
import Button from "../components/ui/button-1";
import HoldActionButton from "../components/ui/HoldActionButton";
import Skeleton from "../components/ui/Skeleton";
import { Plus, Trash2, X } from "lucide-react";

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (data) setItems(data);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function toggle(item, field) {
    setUpdatingId(item.id);
    try {
      const { data, error } = await supabase.from("testimonials").update({ [field]: !item[field] }).eq("id", item.id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Testimonial was not found or could not be updated.");
      toast.success("Item updated successfully!");
      await load();
    } catch (error) {
      console.error("Failed to update testimonial:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  async function remove(id) {
    setDeletingId(id);
    try {
      const { data, error } = await supabase.from("testimonials").delete().eq("id", id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Testimonial was not found or could not be deleted.");
      toast.success("Item deleted successfully!");
      await load();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">Testimonials</h1>
          <p className="text-sm text-navy-700/60">Only approved, real customer reviews are shown publicly.</p>
        </div>
        <button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-blue-700">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div role="status" aria-label="Loading testimonials" className="grid gap-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="border border-silver-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="w-full space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
                <Skeleton className="h-7 w-7 shrink-0" />
              </div>
              <div className="mt-4 flex gap-2"><Skeleton className="h-6 w-24" /><Skeleton className="h-6 w-20" /></div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-navy-700/50 border border-dashed border-silver-300 p-8 text-center">No testimonials yet.</p>
      ) : (
        <div className="grid gap-4">
          {items.map((t) => (
            <div key={t.id} className="bg-white border border-silver-200 p-5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-sm">{t.customer_name} &bull; {"\u2605".repeat(t.rating || 0)}</p>
                  <p className="text-sm text-navy-700/70 mt-2 leading-relaxed">{t.review}</p>
                </div>
                <HoldActionButton loading={deletingId === t.id} disabled={Boolean(deletingId)} onConfirm={() => remove(t.id)} className="!p-1 !text-navy-700/40 hover:!text-red-600 shrink-0" aria-label="Hold to delete testimonial"><Trash2 size={15} /></HoldActionButton>
              </div>
              <div className="flex gap-2 mt-3">
                <button disabled={updatingId === t.id} onClick={() => toggle(t, "approved")} className={`text-xs px-2 py-1 border disabled:opacity-50 ${t.approved ? "bg-green-50 border-green-600 text-green-700" : "border-silver-300 text-navy-700/50"}`}>
                  {t.approved ? "Approved" : "Pending approval"}
                </button>
                <button disabled={updatingId === t.id} onClick={() => toggle(t, "featured")} className={`text-xs px-2 py-1 border disabled:opacity-50 ${t.featured ? "bg-blue-50 border-blue-600 text-blue-700" : "border-silver-300 text-navy-700/50"}`}>
                  {t.featured ? "Featured" : "Not featured"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {adding && <TestimonialForm onClose={() => setAdding(false)} onSaved={() => { setAdding(false); load(); }} />}
    </div>
  );
}

function TestimonialForm({ onClose, onSaved }) {
  const [form, setForm] = useState({ customer_name: "", review: "", rating: 5, approved: false, featured: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from("testimonials").insert([form]).select("id").single();
      if (error) throw error;
      if (!data) throw new Error("No testimonial was returned after saving.");
      toast.success("Item created successfully!");
      onSaved();
    } catch (error) {
      console.error("Failed to create testimonial:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-navy-950/60 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white max-w-md w-full p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">Add Testimonial</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </div>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-navy-800 mb-1.5">Customer Name</span>
          <input required className="input" value={form.customer_name} onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))} />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-navy-800 mb-1.5">Review</span>
          <textarea required rows={3} className="input" value={form.review} onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))} />
        </label>
        <label className="block mb-6">
          <span className="block text-sm font-medium text-navy-800 mb-1.5">Rating (1-5)</span>
          <input type="number" min={1} max={5} className="input" value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))} />
        </label>
        <Button type="submit" loading={isSubmitting} className="w-full">Save Testimonial</Button>
      </form>
    </div>
  );
}
