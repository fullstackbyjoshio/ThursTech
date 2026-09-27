import Seo from "../components/ui/Seo";
import SectionHeading from "../components/ui/SectionHeading";
import { business } from "../data/business";

export default function About() {
  return (
    <>
      <Seo
        title="About THURSTECH Nigeria Limited"
        description="THURSTECH Nigeria Limited is a Nigerian air-conditioning and HVAC solutions company covering sales, installation, servicing and repair."
        path="/about"
      />
      <section className="container-page py-16 sm:py-20 max-w-3xl">
        <SectionHeading eyebrow="About Us" title="THURSTECH Nigeria Limited" />
        <div className="mt-6 space-y-4 text-navy-700/80 leading-relaxed">
          <p>
            THURSTECH Nigeria Limited (RC: {business.rcNumber}) is a Nigerian technical and
            air-conditioning solutions company covering equipment sales, installation, servicing,
            maintenance and repair.
          </p>
          <p className="font-semibold text-navy-900">Buy it. Install it. Maintain it. Repair it.</p>
          <p>
            Rather than sending customers to separate companies for equipment, installation and
            after-sales support, THURSTECH aims to handle the complete air-conditioning journey in
            one place.
          </p>
        </div>

        <div className="mt-10 border border-dashed border-silver-300 p-6 text-sm text-navy-700/80">
          <p className="font-semibold text-navy-900 mb-1">More about our story, coming soon</p>
          <p>
            Founding year, leadership background, brands supplied, certifications and service
            locations will be added here once confirmed, so this page only presents what has
            actually been verified.
          </p>
        </div>
      </section>
    </>
  );
}
