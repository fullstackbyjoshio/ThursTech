import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Seo from "../components/ui/Seo";
import Button from "../components/ui/Button";
import WhatsAppLink from "../components/ui/WhatsAppLink";
import { whatsappTemplates } from "../lib/whatsapp";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data } = await supabase.from("products").select("*").eq("id", id).eq("active", true).maybeSingle();
      if (active) {
        setProduct(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <div className="container-page py-20 text-sm text-navy-700/50">Loading...</div>;

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <p className="font-display font-bold text-xl mb-2">Product not found</p>
        <Link to="/shop" className="text-blue-600 font-semibold">Back to shop</Link>
      </div>
    );
  }

  const productName = `${product.brand || ""} ${product.name || ""}`.trim();
  const specs = [
    ["Brand", product.brand],
    ["Model", product.model],
    ["Category", product.category],
    ["Capacity", product.capacity],
    ["Type", product.type],
    ["Refrigerant", product.refrigerant],
    ["Voltage", product.voltage],
    ["Warranty", product.warranty],
    ["Availability", product.availability],
  ].filter(([, v]) => v);

  return (
    <>
      <Seo
        title={`${productName} | THURSTECH`}
        description={product.description || `Enquire about the ${productName} from THURSTECH Nigeria Limited.`}
        path={`/shop/${product.id}`}
        image={product.image_url}
        type="product"
      />
      <section className="container-page py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="aspect-square bg-silver-100 flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <img src={product.image_url} alt={productName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-navy-700/40">No image available</span>
          )}
        </div>

        <div>
          <p className="text-ice-500 font-semibold text-sm mb-2">{product.category}</p>
          <h1 className="text-3xl font-extrabold mb-3">{productName}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-6">
            {product.price ? `\u20a6${Number(product.price).toLocaleString()}` : "Request Current Price"}
          </p>

          {product.description && <p className="text-navy-700/80 leading-relaxed mb-6">{product.description}</p>}

          {specs.length > 0 && (
            <table className="w-full text-sm mb-8">
              <tbody>
                {specs.map(([label, value]) => (
                  <tr key={label} className="border-b border-silver-200">
                    <td className="py-2 pr-4 text-navy-700/60">{label}</td>
                    <td className="py-2 font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="flex flex-wrap gap-3">
            <WhatsAppLink
              message={whatsappTemplates.product(productName)}
              className="!bg-[#25D366] !text-white px-5 py-3 hover:!no-underline hover:opacity-90"
            />
            <Button to="/request-a-quote" variant="outline">
              Request This AC
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
