import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "../components/ui/Seo";
import SectionHeading from "../components/ui/SectionHeading";
import { services } from "../data/services";

export default function Services() {
  return (
    <>
      <Seo
        title="AC Services | THURSTECH Nigeria Limited"
        description="Air conditioner installation, repair, servicing, maintenance, relocation and commercial HVAC services from THURSTECH Nigeria Limited."
        path="/services"
      />
      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Services" title="What We Do" description="Sales, installation, repair and servicing, covered end to end." />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group border border-silver-200 p-6 hover:border-blue-600 transition-colors flex flex-col"
            >
              <h2 className="font-display font-bold text-lg mb-2">{service.navLabel}</h2>
              <p className="text-sm text-navy-700/70 mb-4 leading-relaxed flex-1">{service.intro}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
