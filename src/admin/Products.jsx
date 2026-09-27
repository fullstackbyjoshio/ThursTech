import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../components/ui/Toast";
import Button from "../components/ui/button-1";
import HoldActionButton from "../components/ui/HoldActionButton";
import Skeleton from "../components/ui/Skeleton";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptyProduct = {
  brand: "", name: "", model: "", category: "Split AC", capacity: "", type: "Inverter",
  refrigerant: "", voltage: "", description: "", specifications: "", price: "",
  availability: "In Stock", warranty: "", image_url: "", images: [], featured: false, active: true,
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | product object
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (data) setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    setDeletingId(id);
    try {
      const { data, error } = await supabase.from("products").delete().eq("id", id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Product was not found or could not be deleted.");
      toast.success("Item deleted successfully!");
      await load();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleField(product, field) {
    setUpdatingId(product.id);
    try {
      const { data, error } = await supabase.from("products").update({ [field]: !product[field] }).eq("id", product.id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Product was not found or could not be updated.");
      toast.success("Item updated successfully!");
      await load();
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">Products</h1>
          <p className="text-sm text-navy-700/80">Manage the AC catalogue shown on the Shop page.</p>
        </div>
        <button onClick={() => setEditing("new")} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-blue-700">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {loading ? (
        <div role="status" aria-label="Loading products" className="border border-silver-200 bg-white">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 border-b border-silver-200 px-4 py-4 last:border-b-0">
              <div className="col-span-2 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-sm text-navy-700/80 border border-dashed border-silver-300 p-8 text-center">No products yet. Add your first AC unit.</p>
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
                    <p className="text-xs text-navy-700/80">{p.capacity} &bull; {p.model}</p>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.price ? `\u20a6${Number(p.price).toLocaleString()}` : "Request Price"}</td>
                  <td className="px-4 py-3">
                    <button disabled={updatingId === p.id} onClick={() => toggleField(p, "featured")} className={`text-xs px-2 py-1 border disabled:opacity-50 ${p.featured ? "bg-blue-50 border-blue-600 text-blue-700" : "border-silver-300 text-navy-700/80"}`}>
                      {p.featured ? "Featured" : "Not featured"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button disabled={updatingId === p.id} onClick={() => toggleField(p, "active")} className={`text-xs px-2 py-1 border disabled:opacity-50 ${p.active ? "bg-green-50 border-green-700 text-green-800" : "border-silver-300 text-navy-700/80"}`}>
                      {p.active ? "Published" : "Unpublished"}
                    </button>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <button onClick={() => setEditing(p)} className="text-navy-700/80 hover:text-blue-600"><Pencil size={15} /></button>
                    <HoldActionButton loading={deletingId === p.id} disabled={Boolean(deletingId)} onConfirm={() => remove(p.id)} className="!p-1 !text-navy-700/70 hover:!text-red-600" aria-label="Hold to delete product"><Trash2 size={15} /></HoldActionButton>
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
  // Ensure images array exists even when loading older products with only image_url
  const initialImages = Array.isArray(initial.images) && initial.images.length > 0
    ? initial.images
    : initial.image_url ? [initial.image_url] : [];

  const [form, setForm] = useState({ ...initial, images: initialImages });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // Handle uploading multiple image files (Up to 3 max)
  async function handleImageUpload(e) {
    try {
      const selectedFiles = Array.from(e.target.files);
      if (!selectedFiles.length) return;

      const currentList = form.images || [];

      if (currentList.length + selectedFiles.length > 3) {
        toast.error(`You can only attach a maximum of 3 photos per product. You currently have ${currentList.length} photo(s).`);
        e.target.value = ""; // Reset file input
        return;
      }

      setUploading(true);
      const uploadedUrls = [];

      for (const file of selectedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `ac-units/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('products').getPublicUrl(filePath);
        uploadedUrls.push(data.publicUrl);
      }

      const updatedImages = [...currentList, ...uploadedUrls];

      setForm((f) => ({
        ...f,
        images: updatedImages,
        image_url: updatedImages[0] || "", // First image serves as the main image_url
      }));
    } catch (error) {
      console.error("Product image upload failed:", error);
      toast.error(`Operation failed: ${error.message}`);
    } finally {
      setUploading(false);
      e.target.value = ""; // Reset input so user can choose again if needed
    }
  }

  // Remove individual photo by index
  function removeImage(indexToRemove) {
    const updatedImages = form.images.filter((_, index) => index !== indexToRemove);
    setForm((f) => ({
      ...f,
      images: updatedImages,
      image_url: updatedImages[0] || "", // Update primary image URL to the new first photo
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const images = Array.isArray(form.images)
        ? form.images.filter((image) => typeof image === "string" && image.trim()).map((image) => image.trim())
        : [];
      const payload = {
        ...form,
        price: form.price ? Number(form.price) : null,
        images,
        image_url: images[0] || form.image_url || "",
      };

      delete payload.created_at;

      let result;
      if (form.id) {
        result = await supabase
          .from("products")
          .update(payload)
          .eq("id", form.id)
          .select("id")
          .maybeSingle();
      } else {
        delete payload.id;
        result = await supabase.from("products").insert([payload]).select("id").single();
      }

      const { data, error } = result;
      if (error) throw error;
      if (!data) throw new Error("No product was returned after saving.");

      toast.success("Product saved successfully!");
      onSaved();
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error(`Failed to save product: ${error.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentImages = form.images || [];

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
          
          {/* Multi-File Upload Selector (Up to 3 Photos) */}
          <div className="block">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-navy-800">Product Photos (Max 3)</span>
              <span className="text-xs text-navy-700/80">{currentImages.length}/3 uploaded</span>
            </div>
            
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploading || currentImages.length >= 3}
              className="block w-full text-xs text-navy-700 file:mr-3 file:py-2 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-silver-300 p-1 disabled:opacity-50"
            />
            {uploading && <p className="text-xs text-blue-600 mt-1">Uploading photos...</p>}

            {/* Thumbnail Previews Grid */}
            {currentImages.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {currentImages.map((url, idx) => (
                  <div key={idx} className="relative group border rounded p-1 bg-silver-50">
                    <img src={url} alt={`Product photo ${idx + 1}`} className="w-full h-16 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 transition-colors"
                      title="Remove image"
                    >
                      <X size={12} />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 bg-navy-950/70 text-white text-[9px] px-1 rounded">
                        Main
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
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
          <Button loading={isSubmitting} disabled={uploading}>Save Product</Button>
          <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-navy-700/80">Cancel</button>
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