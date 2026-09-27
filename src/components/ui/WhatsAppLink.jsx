import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../../lib/whatsapp";

export default function WhatsAppLink({ message, children, className = "" }) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-semibold text-green-700 hover:underline ${className}`}
    >
      <MessageCircle size={18} />
      {children || "Chat on WhatsApp"}
    </a>
  );
}
