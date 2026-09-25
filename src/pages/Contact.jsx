import { useState } from "react";
import { CheckCircle2, AlertTriangle, Phone, Mail } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { sendFormEmail } from "../lib/emailjs";
import Seo from "../components/ui/Seo";
import SectionHeading from "../components/ui/SectionHeading";
import { business } from "../data/business";

const SERVICE_OPTIONS = ["Buy an AC", "AC Installation", "AC Repair", "AC Servicing", "AC Maintenance", "Commercial Project", "Other"];

const initialForm = {
  customer_name: "",
  phone: "",
  email: "",
  service_type: SERVICE_OPTIONS[0],
  location: "",
  description: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      // Contact enquiries are stored alongside quote requests so they show
      // up in the same admin lead-management view.
      const { error: insertError } = await supabase.from("quote_requests").insert([
        {
          customer_name: form.customer_name,
          phone: form.phone,
          email: form.email,
          service_type: form.service_type,
          location: form.location,
          description: form.description,
          status: "new",
        },
      ]);
      if (insertError) throw insertError;

      await sendFormEmail("General Contact", form);

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("error");
    }
  }

  return (
    <>
      <Seo
        title="Contact THURSTECH Nigeria Limited | AC & HVAC Services"
        description="Contact THURSTECH Nigeria Limited for air conditioner sales, installation, repair, servicing and maintenance enquiries."
        path="/contact"
      />
      <section className="container-page py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <SectionHeading eyebrow="Contact" title="Get In Touch" description="Reach us directly, or send a message below." />

          <div className="mt-8 space-y-4">
            {business.phones.map((phone, i) => (
              <a key={phone} href={`tel:${business.phonesIntl[i]}`} className="flex items-center gap-3 text-sm font-medium hover:text-blue-600">
                <Phone size={18} className="text-blue-600" />
                {phone}
              </a>
            ))}
            <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-sm font-medium hover:text-blue-600 break-all">
              <Mail size={18} className="text-blue-600" />
              {business.email}
            </a>
          </div>
        </div>

        <div>
          {status === "success" && (
            <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 p-4 text-sm">
              <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
              <p className="font-semibold">Your message has been received. We will get back to you shortly.</p>
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 p-4 text-sm">
              <AlertTriangle size={20} className="shrink-0 mt-0.5" />
              <p>Something went wrong. Please try again, or contact us directly by phone.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Full Name">
              <input required value={form.customer_name} onChange={(e) => update("customer_name", e.target.value)} className="input" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Phone Number">
                <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" />
              </Field>
            </div>
            <Field label="Service Required">
              <select value={form.service_type} onChange={(e) => update("service_type", e.target.value)} className="input">
                {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Preferred Location">
              <input value={form.location} onChange={(e) => update("location", e.target.value)} className="input" />
            </Field>
            <Field label="Message">
              <textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="input" />
            </Field>
            <button type="submit" disabled={status === "loading"} className="w-full bg-blue-600 text-white py-3.5 font-semibold hover:bg-blue-700 disabled:opacity-60">
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-navy-800 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
