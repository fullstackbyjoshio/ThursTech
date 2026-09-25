import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { primaryNav } from "../../data/navigation";
import { business } from "../../data/business";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-silver-200">
      <div className="container-page py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <p className="font-display font-extrabold text-xl text-white mb-3">THURSTECH</p>
          <p className="text-sm text-silver-300 leading-relaxed">
            Buy it. Install it. Maintain it. Repair it. THURSTECH Nigeria Limited supplies,
            installs, services and repairs air-conditioning systems for homes, offices and
            businesses.
          </p>
          <p className="text-xs text-silver-400 mt-4">RC: {business.rcNumber}</p>
        </div>

        <div>
          <p className="text-white font-semibold text-sm mb-3">Navigate</p>
          <ul className="space-y-2 text-sm">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="hover:text-ice-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold text-sm mb-3">Contact</p>
          <ul className="space-y-3 text-sm">
            {business.phones.map((phone, i) => (
              <li key={phone} className="flex items-center gap-2">
                <Phone size={15} className="text-ice-400 shrink-0" />
                <a href={`tel:${business.phonesIntl[i]}`} className="hover:text-ice-400">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-ice-400 shrink-0" />
              <a href={`mailto:${business.email}`} className="hover:text-ice-400 break-all">
                {business.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-page py-5 text-xs text-silver-400 flex flex-col sm:flex-row justify-between gap-2">
          <p>&copy; {year} THURSTECH Nigeria Limited. All rights reserved.</p>
          <Link to="/admin/login" className="hover:text-ice-400">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
