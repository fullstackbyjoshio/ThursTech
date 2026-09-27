export default function StatCard({ label, value, accent = false }) {
  return (
    <div className={`border p-5 ${accent ? "border-blue-600 bg-blue-50" : "border-silver-200 bg-white"}`}>
      <p className="text-xs font-semibold text-navy-700 uppercase tracking-wide mb-2">{label}</p>
      <p className="text-3xl font-display font-extrabold text-navy-900">{value}</p>
    </div>
  );
}
