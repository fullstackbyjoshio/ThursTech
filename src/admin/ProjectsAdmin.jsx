import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../components/ui/Toast";
import Button from "../components/ui/button-1";
import HoldActionButton from "../components/ui/HoldActionButton";
import Skeleton from "../components/ui/Skeleton";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptyProject = {
  title: "", location: "", service: "", description: "", cover_image: "",
  gallery: "", project_date: "", featured: false,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("projects").select("*").order("project_date", { ascending: false });
      if (error) throw error;
      if (data) setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    setDeletingId(id);
    try {
      const { data, error } = await supabase.from("projects").delete().eq("id", id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Project was not found or could not be deleted.");
      toast.success("Item deleted successfully!");
      await load();
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleFeatured(p) {
    setUpdatingId(p.id);
    try {
      const { data, error } = await supabase.from("projects").update({ featured: !p.featured }).eq("id", p.id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Project was not found or could not be updated.");
      toast.success("Item updated successfully!");
      await load();
    } catch (error) {
      console.error("Failed to update project:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">Projects</h1>
          <p className="text-sm text-navy-700/60">Real, completed work shown on the Projects page.</p>
        </div>
        <button onClick={() => setEditing("new")} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-blue-700">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div role="status" aria-label="Loading projects" className="border border-silver-200 bg-white">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 border-b border-silver-200 px-4 py-4 last:border-b-0">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-sm text-navy-700/50 border border-dashed border-silver-300 p-8 text-center">No projects yet. Add your first completed job.</p>
      ) : (
        <div className="overflow-x-auto border border-silver-200 bg-white">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-silver-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Project</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Featured</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-silver-200">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">{p.location}</td>
                  <td className="px-4 py-3">{p.service}</td>
                  <td className="px-4 py-3">
                    <button disabled={updatingId === p.id} onClick={() => toggleFeatured(p)} className={`text-xs px-2 py-1 border disabled:opacity-50 ${p.featured ? "bg-blue-50 border-blue-600 text-blue-700" : "border-silver-300 text-navy-700/50"}`}>
                      {p.featured ? "Featured" : "Not featured"}
                    </button>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <button onClick={() => setEditing(p)} className="text-navy-700/60 hover:text-blue-600"><Pencil size={15} /></button>
                    <HoldActionButton loading={deletingId === p.id} disabled={Boolean(deletingId)} onConfirm={() => remove(p.id)} className="!p-1 !text-navy-700/60 hover:!text-red-600" aria-label="Hold to delete project"><Trash2 size={15} /></HoldActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <ProjectForm
          initial={editing === "new" ? emptyProject : { ...editing, gallery: Array.isArray(editing.gallery) ? editing.gallery.join("\n") : editing.gallery }}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
    </div>
  );
}

function ProjectForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        gallery: form.gallery ? form.gallery.split("\n").map((s) => s.trim()).filter(Boolean) : [],
        project_date: form.project_date || null,
      };
      let result;
      if (form.id) {
        result = await supabase.from("projects").update(payload).eq("id", form.id).select("id").maybeSingle();
      } else {
        delete payload.id;
        result = await supabase.from("projects").insert([payload]).select("id").single();
      }
      const { data, error } = result;
      if (error) throw error;
      if (!data) throw new Error("No project was returned after saving.");
      toast.success(form.id ? "Item updated successfully!" : "Item created successfully!");
      onSaved();
    } catch (error) {
      console.error("Failed to save project:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-navy-950/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white max-w-xl w-full p-6 sm:p-8 my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">{form.id ? "Edit Project" : "Add Project"}</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <TextField label="Project Title" value={form.title} onChange={(v) => update("title", v)} />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Location" value={form.location} onChange={(v) => update("location", v)} />
            <TextField label="Service" value={form.service} onChange={(v) => update("service", v)} />
          </div>
          <TextField label="Project Date" type="date" value={form.project_date} onChange={(v) => update("project_date", v)} />
          <TextField label="Cover Image URL" value={form.cover_image} onChange={(v) => update("cover_image", v)} />
          <label className="block">
            <span className="block text-sm font-medium text-navy-800 mb-1.5">Gallery Image URLs (one per line)</span>
            <textarea rows={3} className="input" value={form.gallery} onChange={(e) => update("gallery", e.target.value)} />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-navy-800 mb-1.5">Description</span>
            <textarea rows={3} className="input" value={form.description} onChange={(e) => update("description", e.target.value)} />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
            Featured
          </label>
        </div>

        <div className="flex gap-3 mt-8">
          <Button type="submit" loading={isSubmitting}>Save Project</Button>
          <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-navy-700/60">Cancel</button>
        </div>
      </form>
    </div>
  );
}

function TextField({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-navy-800 mb-1.5">{label}</span>
      <input type={type} className="input" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
