export default function EmptyState({ title, description }) {
  return (
    <div className="border border-dashed border-silver-300 rounded-sm py-16 px-6 text-center">
      <p className="font-display font-semibold text-navy-900 mb-1">{title}</p>
      {description && <p className="text-sm text-navy-700/80 max-w-md mx-auto">{description}</p>}
    </div>
  );
}
