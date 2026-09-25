import { Phone } from "lucide-react";
import Button from "../ui/Button";
import WhatsAppLink from "../ui/WhatsAppLink";
import { business } from "../../data/business";
import { whatsappTemplates } from "../../lib/whatsapp";

export default function FinalCta() {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-page py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Ready to get started?</h2>
          <p className="text-silver-300">Call, message us on WhatsApp, or request a quote.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={`tel:${business.phonesIntl[0]}`} variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-navy-900">
            <Phone size={16} /> {business.phones[0]}
          </Button>
          <WhatsAppLink message={whatsappTemplates.general()} className="!bg-[#25D366] !text-white px-5 py-3 hover:!no-underline hover:opacity-90" />
          <Button to="/request-a-quote" variant="primary">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
