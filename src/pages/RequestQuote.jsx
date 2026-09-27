import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { sendFormEmail } from "../lib/emailjs";
import { buildWhatsAppLink, whatsappTemplates } from "../lib/whatsapp";
import Seo from "../components/ui/Seo";
import SectionHeading from "../components/ui/SectionHeading";
import { toast } from "../components/ui/Toast";
import Button from "../components/ui/button-1";

const SERVICE_OPTIONS = ["Buy AC", "Installation", "Repair", "Servicing", "Maintenance", "Commercial Project", "Other"];
const AC_TYPE_OPTIONS = ["Split", "Inverter", "Floor Standing", "Cassette", "Not Sure"];
const CAPACITY_OPTIONS = ["1HP", "1.5HP", "2HP", "2.5HP", "3HP+", "Not Sure"];
const CONTACT_METHODS = ["Phone Call", "WhatsApp", "Email"];

const initialForm = {
  service_type: SERVICE_OPTIONS[0],
  ac_type: "",
  capacity: "",
  location: "",
  description: "",
  phone: "",
  whatsapp: "",
  email: "",
  customer_name: "",
  preferred_contact: CONTACT_METHODS[0],
};

export default function RequestQuote() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      let photo_url = null;
      if (photo) {
        const path = `quote-requests/${Date.now()}-${photo.name}`;
        const { error: uploadError } = await supabase.storage.from("uploads").upload(path, photo);
        if (!uploadError) {
          const { data } = supabase.storage.from("uploads").getPublicUrl(path);
          photo_url = data?.publicUrl ?? null;
        }
      }

      // Save to Supabase first - this is the source of truth. A failed
      // email notification below must never cause the lead to be lost.
      const { error: insertError } = await supabase.from("quote_requests").insert([
        {
          customer_name: form.customer_name,
          email: form.email,
          phone: form.phone,
          whatsapp: form.whatsapp,
          service_type: form.service_type,
          ac_type: form.ac_type,
          capacity: form.capacity,
          location: form.location,
          description: form.description,
          preferred_contact: form.preferred_contact,
          photo_url,
          status: "new",
        },
      ]);

      if (insertError) throw insertError;

      await sendFormEmail("Quote Request", { ...form, photo_url });

      setStatus("success");
      setForm(initialForm);
      setPhoto(null);
      toast.success("Your request has been submitted successfully!");
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(`Submission failed: ${error?.message || "Please try again."}`);
      setStatus("error");
    }
  }

  return (
    <>
      <Seo
        title="Request a Quote | THURSTECH"
        description="Request an AC sales, installation, repair, servicing or maintenance quote from THURSTECH Nigeria Limited."
        path="/request-a-quote"
      />
      <section className="container-page py-16 sm:py-20 max-w-2xl">
        <SectionHeading eyebrow="Request a Quote" title="Tell Us What You Need" description="Fill in the details below and our team will get back to you." />

        {status === "success" && (
          <div className="mt-8 flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 p-4 text-sm">
            <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Your request has been received.</p>
              <p className="mt-1">
                We will get back to you shortly. You can also{" "}
                <a
                  href={buildWhatsAppLink(whatsappTemplates.quote(form.service_type))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold"
                >
                  message us on WhatsApp
                </a>{" "}
                for a faster response.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-8 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 p-4 text-sm">
            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
            <p>Something went wrong sending your request. Please try again, or contact us directly on WhatsApp or by phone.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name">
              <input required value={form.customer_name} onChange={(e) => update("customer_name", e.target.value)} className="input" />
            </Field>
            <Field label="Phone Number">
              <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" />
            </Field>
            <Field label="WhatsApp Number">
              <input type="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="input" />
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Field label="Service Required">
              <select value={form.service_type} onChange={(e) => update("service_type", e.target.value)} className="input">
                {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="AC Type">
              <select value={form.ac_type} onChange={(e) => update("ac_type", e.target.value)} className="input">
                <option value="">Select</option>
                {AC_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Capacity">
              <select value={form.capacity} onChange={(e) => update("capacity", e.target.value)} className="input">
                <option value="">Select</option>
                {CAPACITY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Customer Location">
            <input required value={form.location} onChange={(e) => update("location", e.target.value)} className="input" placeholder="e.g. Sagamu, Ogun State" />
          </Field>

          <Field label="Description">
            <textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="input" />
          </Field>

          <Field label="Preferred Contact Method">
            <select value={form.preferred_contact} onChange={(e) => update("preferred_contact", e.target.value)} className="input">
              {CONTACT_METHODS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>

          <Field label="Photo (optional)">
            <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} className="text-sm" />
          </Field>

          <Button
            type="submit"
            loading={status === "loading"}
            className="w-full py-3.5"
          >
            {status === "loading" ? "Sending..." : "Request My Quote"}
          </Button>
        </form>
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
