const STATUS_STYLES = {
  new: "bg-ice-300/40 text-navy-800",
  contacted: "bg-silver-200 text-navy-800",
  "assessment scheduled": "bg-blue-500/15 text-blue-700",
  "quotation sent": "bg-blue-500/15 text-blue-700",
  approved: "bg-green-100 text-green-700",
  "in progress": "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status = "new" }) {
  const key = status.toLowerCase();
  const style = STATUS_STYLES[key] || STATUS_STYLES.new;
  return <span className={`inline-block px-2.5 py-1 rounded-sm text-xs font-semibold ${style}`}>{status}</span>;
}
