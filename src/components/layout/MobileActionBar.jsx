import { Phone, MessageCircle, FileText } from "lucide-react";
import { business } from "../../data/business";
import { buildWhatsAppLink, whatsappTemplates } from "../../lib/whatsapp";
import { Link } from "react-router-dom";

/**
 * Mobile-only sticky action bar so Call / WhatsApp / Request Quote are
 * always one tap away for Nigerian mobile visitors, per the blueprint.
 */
export default function MobileActionBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-900 border-t border-navy-700 grid grid-cols-3 text-white text-xs font-semibold">
      <a
        href={`tel:${business.phonesIntl[0]}`}
        className="flex flex-col items-center justify-center gap-1 py-2.5 border-r border-navy-700"
      >
        <Phone size={18} />
        Call
      </a>
      <a
        href={buildWhatsAppLink(whatsappTemplates.general())}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 py-2.5 border-r border-navy-700 text-[#4FE38A]"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
      <Link to="/request-a-quote" className="flex flex-col items-center justify-center gap-1 py-2.5 text-ice-300">
        <FileText size={18} />
        Quote
      </Link>
    </div>
  );
}
