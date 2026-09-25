import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { primaryNav, quoteNav } from "../../data/navigation";
import { business } from "../../data/business";
import Button from "../ui/Button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-white">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="font-display font-extrabold text-xl tracking-tight">
          THURSTECH
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {primaryNav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium hover:text-ice-300 transition-colors">
                  {item.label}
                  <ChevronDown size={14} />
                </button>
                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-3 w-56">
                    <div className="bg-white text-navy-900 shadow-lg border border-silver-200 rounded-sm py-2">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2.5 text-sm hover:bg-silver-100"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-ice-300 ${
                    isActive ? "text-ice-300" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${business.phonesIntl[0]}`}
            className="flex items-center gap-2 text-sm font-medium hover:text-ice-300"
          >
            <Phone size={16} />
            {business.phones[0]}
          </a>
          <Button to={quoteNav.to} variant="primary">
            {quoteNav.label}
          </Button>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-navy-900 border-t border-navy-700 pb-4">
          <nav className="container-page flex flex-col gap-1 pt-2">
            {primaryNav.map((item) =>
              item.children ? (
                <details key={item.label} className="group">
                  <summary className="flex items-center justify-between py-2.5 text-sm font-medium cursor-pointer list-none">
                    {item.label}
                    <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pl-3 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="py-2 text-sm text-silver-300"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="py-2.5 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              to={quoteNav.to}
              className="mt-2 bg-blue-600 text-white text-center py-3 text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              {quoteNav.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
