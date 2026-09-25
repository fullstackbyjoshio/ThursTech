import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../../data/services";
import SectionHeading from "../ui/SectionHeading";

export default function ServicesOverview() {
  return (
    <section className="bg-silver-100 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          description="From first installation to ongoing care, THURSTECH covers the full lifecycle of your air conditioning."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group bg-white p-6 border border-silver-200 hover:border-blue-600 transition-colors flex flex-col"
            >
              <h3 className="font-display font-bold text-lg mb-2">{service.navLabel}</h3>
              <p className="text-sm text-navy-700/70 mb-4 leading-relaxed flex-1">{service.intro}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
