import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptyProduct = {
  brand: "", name: "", model: "", category: "Split AC", capacity: "", type: "Inverter",
  refrigerant: "", voltage: "", description: "", specifications: "", price: "",
  availability: "In Stock", warranty: "", image_url: "", featured: false, active: true,
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | product object

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error && data) setProducts(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!window.confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    load();
  }

  async function toggleField(product, field) {
    await supabase.from("products").update({ [field]: !product[field] }).eq("id", product.id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">Products</h1>
          <p className="text-sm text-navy-700/60">Manage the AC catalogue shown on the Shop page.</p>
        </div>
        <button onClick={() => setEditing("new")} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-blue-700">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-navy-700/50">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-navy-700/50 border border-dashed border-silver-300 p-8 text-center">No products yet. Add your first AC unit.</p>
      ) : (
        <div className="overflow-x-auto border border-silver-200 bg-white">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-silver-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Featured</th>
                <th className="px-4 py-3 font-semibold">Active</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-silver-200">
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.brand} {p.name}</p>
                    <p className="text-xs text-navy-700/50">{p.capacity} &bull; {p.model}</p>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.price ? `\u20a6${Number(p.price).toLocaleString()}` : "Request Price"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleField(p, "featured")} className={`text-xs px-2 py-1 border ${p.featured ? "bg-blue-50 border-blue-600 text-blue-700" : "border-silver-300 text-navy-700/50"}`}>
                      {p.featured ? "Featured" : "Not featured"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleField(p, "active")} className={`text-xs px-2 py-1 border ${p.active ? "bg-green-50 border-green-600 text-green-700" : "border-silver-300 text-navy-700/50"}`}>
                      {p.active ? "Published" : "Unpublished"}
                    </button>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <button onClick={() => setEditing(p)} className="text-navy-700/60 hover:text-blue-600"><Pencil size={15} /></button>
                    <button onClick={() => remove(p.id)} className="text-navy-700/60 hover:text-red-600"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <ProductForm
          initial={editing === "new" ? emptyProduct : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
    </div>
  );
}

function ProductForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, price: form.price ? Number(form.price) : null };
    delete payload.created_at;
    if (form.id) {
      await supabase.from("products").update(payload).eq("id", form.id);
    } else {
      delete payload.id;
      await supabase.from("products").insert([payload]);
    }
    setSaving(false);
    onSaved();
  }

  return (
    <div className="fixed inset-0 bg-navy-950/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white max-w-2xl w-full p-6 sm:p-8 my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">{form.id ? "Edit Product" : "Add Product"}</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Brand" value={form.brand} onChange={(v) => update("brand", v)} />
          <TextField label="Product Name" value={form.name} onChange={(v) => update("name", v)} />
          <TextField label="Model" value={form.model} onChange={(v) => update("model", v)} />
          <TextField label="Capacity (e.g. 1.5HP)" value={form.capacity} onChange={(v) => update("capacity", v)} />
          <SelectField label="Category" value={form.category} onChange={(v) => update("category", v)}
            options={["Split AC", "Inverter AC", "Non-Inverter AC", "Floor Standing AC", "Cassette AC"]} />
          <SelectField label="Type" value={form.type} onChange={(v) => update("type", v)} options={["Inverter", "Non-Inverter"]} />
          <TextField label="Refrigerant" value={form.refrigerant} onChange={(v) => update("refrigerant", v)} />
          <TextField label="Voltage" value={form.voltage} onChange={(v) => update("voltage", v)} />
          <TextField label="Price (leave blank for Request Price)" type="number" value={form.price} onChange={(v) => update("price", v)} />
          <TextField label="Warranty" value={form.warranty} onChange={(v) => update("warranty", v)} />
          <SelectField label="Availability" value={form.availability} onChange={(v) => update("availability", v)}
            options={["In Stock", "Out of Stock", "Made to Order"]} />
          <TextField label="Image URL" value={form.image_url} onChange={(v) => update("image_url", v)} />
        </div>

        <label className="block mt-4">
          <span className="block text-sm font-medium text-navy-800 mb-1.5">Description</span>
          <textarea rows={3} className="input" value={form.description} onChange={(e) => update("description", e.target.value)} />
        </label>

        <label className="block mt-4">
          <span className="block text-sm font-medium text-navy-800 mb-1.5">Specifications</span>
          <textarea rows={2} className="input" value={form.specifications} onChange={(e) => update("specifications", e.target.value)} />
        </label>

        <div className="flex gap-6 mt-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)} />
            Published / Active
          </label>
        </div>

        <div className="flex gap-3 mt-8">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
            {saving ? "Saving..." : "Save Product"}
          </button>
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

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-navy-800 mb-1.5">{label}</span>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
