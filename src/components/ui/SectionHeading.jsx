export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="text-blue-600 font-semibold text-sm mb-2">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h2>
      {description && <p className="text-navy-700/80 text-base leading-relaxed">{description}</p>}
    </div>
  );
}
