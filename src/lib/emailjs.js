import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends one form submission through the universal EmailJS template.
 * Email delivery is best-effort; Supabase remains the source of truth.
 */
export async function sendFormEmail(form_type, formData = {}) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS env vars missing - skipping email notification.");
    return { skipped: true };
  }

  const templateParams = {
    form_type,
    customer_name: formData.customer_name ?? "",
    email: formData.email ?? "",
    phone: formData.phone ?? "",
    whatsapp: formData.whatsapp ?? "",
    service_type: formData.service_type ?? "",
    brand: formData.brand ?? "",
    model: formData.model ?? "",
    location: formData.location ?? "",
    preferred_contact: formData.preferred_contact ?? "",
    preferred_date: formData.preferred_date ?? "",
    description: formData.description ?? "",
    photo_url: formData.photo_url ?? "",
  };

  return emailjs
    .send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    })
    .then((result) => ({ success: true, result }))
    .catch((error) => {
      console.error("EmailJS notification failed:", error);
      return { success: false, error };
    });
}
