import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { sendFormEmail } from "../lib/emailjs";
import { buildWhatsAppLink, whatsappTemplates } from "../lib/whatsapp";
import Seo from "../components/ui/Seo";
import SectionHeading from "../components/ui/SectionHeading";

const PROBLEM_OPTIONS = ["Not cooling", "Water leaking", "Making noise", "Not powering on", "Blowing warm air", "Poor airflow", "Electrical issue", "Other"];

const initialForm = {
  customer_name: "",
  phone: "",
  email: "",
  whatsapp: "",
  brand: "",
  model: "",
  problem: PROBLEM_OPTIONS[0],
  location: "",
  description: "",
  preferred_date: "",
};

export default function RequestRepair() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      let photo_url = null;
      if (photo) {
        const path = `repair-requests/${Date.now()}-${photo.name}`;
        const { error: uploadError } = await supabase.storage.from("uploads").upload(path, photo);
        if (!uploadError) {
          const { data } = supabase.storage.from("uploads").getPublicUrl(path);
          photo_url = data?.publicUrl ?? null;
        }
      }

      const { error: insertError } = await supabase.from("repair_requests").insert([
        {
          customer_name: form.customer_name,
          phone: form.phone,
          email: form.email,
          whatsapp: form.whatsapp,
          brand: form.brand,
          model: form.model,
          problem: form.problem,
          location: form.location,
          description: form.description,
          preferred_date: form.preferred_date || null,
          photo_url,
          status: "new",
        },
      ]);
      if (insertError) throw insertError;

      await sendFormEmail("Repair Request", { ...form, photo_url });

      setStatus("success");
      setForm(initialForm);
      setPhoto(null);
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("error");
    }
  }

  return (
    <>
      <Seo
        title="Book AC Repair | THURSTECH"
        description="Book an air conditioner repair with THURSTECH Nigeria Limited. Tell us what is wrong and we will assess and repair it."
        path="/request-repair"
      />
      <section className="container-page py-16 sm:py-20 max-w-2xl">
        <SectionHeading eyebrow="AC Repair" title="Book AC Repair" description="Tell us about the problem and we will get back to you." />

        {status === "success" && (
          <div className="mt-8 flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 p-4 text-sm">
            <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Your repair request has been received.</p>
              <p className="mt-1">
                For a faster response,{" "}
                <a href={buildWhatsAppLink(whatsappTemplates.repair(form.problem, form.location))} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                  message us on WhatsApp
                </a>.
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
            <Field label="AC Brand">
              <input value={form.brand} onChange={(e) => update("brand", e.target.value)} className="input" />
            </Field>
            <Field label="AC Model (if known)">
              <input value={form.model} onChange={(e) => update("model", e.target.value)} className="input" />
            </Field>
          </div>

          <Field label="What is the problem?">
            <select value={form.problem} onChange={(e) => update("problem", e.target.value)} className="input">
              {PROBLEM_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>

          <Field label="Location">
            <input required value={form.location} onChange={(e) => update("location", e.target.value)} className="input" />
          </Field>

          <Field label="Describe the problem">
            <textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="input" />
          </Field>

          <Field label="Preferred Appointment Date (optional)">
            <input type="date" value={form.preferred_date} onChange={(e) => update("preferred_date", e.target.value)} className="input" />
          </Field>

          <Field label="Photo or video (optional)">
            <input type="file" accept="image/*,video/*" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} className="text-sm" />
          </Field>

          <button type="submit" disabled={status === "loading"} className="w-full bg-blue-600 text-white py-3.5 font-semibold hover:bg-blue-700 disabled:opacity-60">
            {status === "loading" ? "Sending..." : "Book AC Repair"}
          </button>
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
