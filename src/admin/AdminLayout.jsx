import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Wrench, Settings2, Users, Package, FolderKanban, Star, HelpCircle, SlidersHorizontal, LogOut } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/quote-requests", label: "Quote Requests", icon: FileText },
  { to: "/admin/repair-requests", label: "Repair Requests", icon: Wrench },
  { to: "/admin/service-requests", label: "Service Requests", icon: Settings2 },
  { to: "/admin/customers", label: "Customers / Leads", icon: Users },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/settings", label: "Settings", icon: SlidersHorizontal },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-silver-100">
      <aside className="w-60 shrink-0 bg-navy-900 text-white flex flex-col">
        <div className="px-5 py-5 font-display font-extrabold text-lg border-b border-navy-700">THURSTECH</div>
        <nav className="flex-1 py-3">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-sm ${isActive ? "bg-navy-800 text-ice-300" : "text-silver-200 hover:bg-navy-800"}`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-4 text-sm text-silver-300 hover:text-white border-t border-navy-700">
          <LogOut size={16} />
          Log Out
        </button>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="p-6 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
