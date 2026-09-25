// Contextual WhatsApp link helper. Never falls back to a generic "Hi" message.
const PRIMARY_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER_1 || "2348034060091";

export function buildWhatsAppLink(message, number = PRIMARY_WHATSAPP) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export const whatsappTemplates = {
  product: (productName) =>
    `Hello THURSTECH, I am interested in the ${productName}. Please send me the current price and availability.`,
  repair: (problem, location) =>
    `Hello THURSTECH, I need AC repair. My AC is ${problem || "[PROBLEM]"}. My location is ${location || "[LOCATION]"}.`,
  installation: (acType, location) =>
    `Hello THURSTECH, I need professional AC installation. I have a ${acType || "[AC TYPE]"} at ${location || "[LOCATION]"}.`,
  quote: (service) => `Hello THURSTECH, I would like to request a quote for ${service || "[SERVICE]"}.`,
  general: () => `Hello THURSTECH, I would like to find out more about your AC services.`,
};
