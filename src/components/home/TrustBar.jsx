const items = ["Quality Equipment", "Professional Installation", "After-Sales Support", "Repair & Maintenance"];

export default function TrustBar() {
  return (
    <div className="bg-silver-100 border-y border-silver-200">
      <div className="container-page py-4 flex flex-wrap gap-x-8 gap-y-2 justify-center text-sm font-semibold text-navy-800">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
