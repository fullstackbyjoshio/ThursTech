import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import SectionHeading from "../ui/SectionHeading";
import EmptyState from "../ui/EmptyState";
import Button from "../ui/Button";
import OptimizedImage from "../ui/OptimizedImage";

/**
 * Pulls real featured products from Supabase. Shows an honest empty state
 * instead of fake placeholder products until real inventory is added
 * through the admin dashboard.
 */
export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .eq("featured", true)
        .limit(4);
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

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <SectionHeading eyebrow="Shop AC" title="Featured Air Conditioners" />
        <Button to="/shop" variant="outline">
          View All AC Units
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-navy-700/50">Loading products...</p>
      ) : products.length === 0 ? (
        <EmptyState
          title="Products coming soon"
          description="The AC catalogue will appear here as soon as inventory is added through the admin dashboard."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <Link key={p.id} to={`/shop/${p.id}`} className="border border-silver-200 hover:border-blue-600 transition-colors">
              <div className="aspect-square bg-silver-100 flex items-center justify-center overflow-hidden">
                {p.image_url ? (
                  <OptimizedImage src={p.image_url} alt={p.name} width={800} height={800} className="w-full h-full object-cover" frameClassName="w-full h-full" />
                ) : (
                  <span className="text-xs text-navy-700/40">No image</span>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm">{p.brand} {p.name}</p>
                <p className="text-xs text-navy-700/60 mt-1">{p.capacity} &bull; {p.category}</p>
                <p className="text-sm font-bold text-blue-600 mt-2">
                  {p.price ? `\u20a6${Number(p.price).toLocaleString()}` : "Request Current Price"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
