export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "Shop AC", to: "/shop" },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "AC Installation", to: "/services/ac-installation" },
      { label: "AC Repair", to: "/services/ac-repair" },
      { label: "AC Servicing", to: "/services/ac-servicing" },
      { label: "AC Maintenance", to: "/services/ac-maintenance" },
      { label: "AC Relocation", to: "/services/ac-relocation" },
      { label: "Commercial HVAC", to: "/services/commercial-hvac" },
    ],
  },
  { label: "Projects", to: "/projects" },
  { label: "About Us", to: "/about" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const quoteNav = { label: "Request a Quote", to: "/request-a-quote" };
