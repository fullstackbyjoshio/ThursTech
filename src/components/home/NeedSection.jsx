import { ShoppingCart, Wrench, Settings2, Hammer } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";

const cards = [
  {
    icon: ShoppingCart,
    title: "Buy an AC",
    body: "Find an air conditioner for your home, office or business.",
    to: "/shop",
    cta: "Shop AC",
  },
  {
    icon: Hammer,
    title: "Install an AC",
    body: "Professional AC installation for your space.",
    to: "/services/ac-installation",
    cta: "Request Installation",
  },
  {
    icon: Wrench,
    title: "Repair My AC",
    body: "Having cooling problems? Tell us what is wrong.",
    to: "/services/ac-repair",
    cta: "Book Repair",
  },
  {
    icon: Settings2,
    title: "Service My AC",
    body: "Keep your AC clean and properly maintained.",
    to: "/services/ac-servicing",
    cta: "Book Servicing",
  },
];

export default function NeedSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading title="How Can We Help You Today?" align="center" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ icon: Icon, title, body, to, cta }) => (
          <Link
            key={title}
            to={to}
            className="group border border-silver-200 p-6 hover:border-blue-600 transition-colors"
          >
            <Icon size={28} className="text-blue-600 mb-4" strokeWidth={1.75} />
            <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-navy-700/80 mb-4 leading-relaxed">{body}</p>
            <span className="text-sm font-semibold text-blue-600 group-hover:underline">{cta}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
