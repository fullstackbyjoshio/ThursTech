import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronDown, Check } from "lucide-react";
import Seo from "../components/ui/Seo";
import Button from "../components/ui/Button";
import WhatsAppLink from "../components/ui/WhatsAppLink";
import { getServiceBySlug } from "../data/services";

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-silver-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left font-medium"
      >
        {q}
        <ChevronDown size={18} className={`transition-transform shrink-0 ml-4 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 text-sm text-navy-700/80 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      <Seo title={service.seo.title} description={service.seo.description} path={`/services/${service.slug}`} />

      <section className="bg-navy-900 text-white">
        <div className="container-page py-16 sm:py-20">
          <p className="text-ice-300 font-semibold text-sm mb-3">Services</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 max-w-2xl">{service.heroHeadline}</h1>
          <p className="text-silver-200 max-w-xl mb-8 leading-relaxed">{service.intro}</p>
          <div className="flex flex-wrap gap-3">
            <WhatsAppLink
              message={service.whatsappMessage()}
              className="!bg-[#15803d] !text-white px-5 py-3 hover:!no-underline hover:opacity-90"
            />
            <Button to={service.requestPath} variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-navy-900">
              {service.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-3">{service.problemHeading}</h2>
          <p className="text-navy-700/80 leading-relaxed">{service.problemBody}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">What is Included</h2>
          <ul className="space-y-2.5">
            {service.whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-navy-700/80">
                <Check size={16} className="text-blue-600 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="bg-silver-100 py-14 sm:py-16">
          <div className="container-page max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div>
              {service.faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-14 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to proceed?</h2>
        <p className="text-navy-700/80 mb-6">Tell us what you need and we will get back to you.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to={service.requestPath} className="bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700">
            {service.ctaLabel}
          </Link>
          <WhatsAppLink message={service.whatsappMessage()} className="!bg-[#15803d] !text-white px-6 py-3 hover:!no-underline hover:opacity-90" />
        </div>
      </section>
    </>
  );
}
