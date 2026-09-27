import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import SEO, { localBusinessJsonLd } from "../components/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import EmptyState from "../components/ui/EmptyState";
import OptimizedImage from "../components/ui/OptimizedImage";

const CATEGORIES = ["All", "Split AC", "Inverter AC", "Non-Inverter AC", "Floor Standing AC", "Cassette AC"];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let active = true;
    async function load() {
      let query = supabase.from("products").select("*").eq("active", true).order("created_at", { ascending: false });
      const { data, error } = await query;
      if (active) {
        if (!error && data) setProducts(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const filtered = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <>
      <SEO
        title="Air Conditioners for Sale in Nigeria | THURSTECH"
        description="Browse air conditioners from THURSTECH Nigeria Limited. Enquire about available models, capacities, pricing, installation and support."
        canonical="/shop"
        jsonLd={localBusinessJsonLd}
      />
      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Shop AC" title="Air Conditioners" description="Browse available models. Prices and availability are kept up to date by our team." />

        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-sm font-medium border transition-colors ${
                category === c ? "bg-navy-900 text-white border-navy-900" : "border-silver-300 text-navy-700 hover:border-navy-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {loading ? (
            <p className="text-sm text-navy-700/80">Loading products...</p>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No products in this category yet"
              description="New air conditioners are added regularly through the admin dashboard. Check back soon, or contact us directly about what you need."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <Link key={p.id} to={`/shop/${p.id}`} className="border border-silver-200 hover:border-blue-600 transition-colors">
                  <div className="aspect-square bg-silver-100 flex items-center justify-center overflow-hidden">
                    {p.image_url ? (
                      <OptimizedImage src={p.image_url} alt={p.name} width={800} height={800} className="w-full h-full object-cover" frameClassName="w-full h-full" />
                    ) : (
                      <span className="text-xs text-navy-700/80">No image</span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm">{p.brand} {p.name}</p>
                    <p className="text-xs text-navy-700/80 mt-1">{p.capacity} &bull; {p.category}</p>
                    <p className="text-sm font-bold text-blue-600 mt-2">
                      {p.price ? `\u20a6${Number(p.price).toLocaleString()}` : "Request Current Price"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
