import { business } from "../data/business";

export default function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-1">Settings</h1>
      <p className="text-sm text-navy-700/80 mb-8">
        Core business details currently used across the site. These come from
        <code className="mx-1 text-xs bg-silver-100 px-1.5 py-0.5">src/data/business.js</code>
        — update that file (and redeploy) to change them everywhere at once.
      </p>

      <div className="bg-white border border-silver-200 p-6 max-w-xl space-y-4 text-sm">
        <Row label="Legal Name" value={business.legalName} />
        <Row label="RC Number" value={business.rcNumber} />
        <Row label="Phone Numbers" value={business.phones.join(", ")} />
        <Row label="Email" value={business.email} />
        <Row label="Address" value={business.address || "Not yet confirmed"} muted={!business.address} />
        <Row label="Opening Hours" value={business.openingHours || "Not yet confirmed"} muted={!business.openingHours} />
      </div>

      <div className="mt-8 max-w-xl border border-dashed border-silver-300 p-5 text-sm text-navy-700/80">
        <p className="font-semibold text-navy-900 mb-1">Environment configuration</p>
        <p>
          Supabase and EmailJS connection details live in the project's <code className="text-xs bg-silver-100 px-1.5 py-0.5">.env</code> file,
          not in this dashboard, so secrets are never exposed to end users. See
          <code className="mx-1 text-xs bg-silver-100 px-1.5 py-0.5">docs/SETUP_SUPABASE.md</code> and
          <code className="mx-1 text-xs bg-silver-100 px-1.5 py-0.5">docs/SETUP_EMAILJS.md</code>.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, muted }) {
  return (
    <div className="flex justify-between gap-4 border-b border-silver-100 pb-3">
      <span className="text-navy-700/80">{label}</span>
      <span className={`font-medium text-right ${muted ? "text-navy-700/80 italic" : ""}`}>{value}</span>
    </div>
  );
}
