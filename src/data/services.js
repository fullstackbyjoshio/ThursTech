// Service page content, built directly from the THURSTECH blueprint. Only
// services the blueprint confirms THURSTECH offers get a page + nav entry
// (Installation, Repair, Servicing, Maintenance, Relocation, Commercial
// HVAC). Additional services flagged "only if confirmed" in the blueprint
// (VRF/VRV, Chillers, Ducting, Ventilation, standalone Emergency Repairs)
// are intentionally left out until THURSTECH confirms them.

export const services = [
  {
    slug: "ac-installation",
    navLabel: "AC Installation",
    requestPath: "/request-a-quote",
    heroHeadline: "Professional Air Conditioner Installation",
    intro:
      "From assessment to commissioning, THURSTECH installs your air conditioner correctly the first time, for homes, offices and businesses.",
    seo: {
      title: "AC Installation Services in Nigeria | THURSTECH",
      description:
        "Professional air conditioner installation for homes, offices and businesses. Contact THURSTECH for AC installation and cooling solutions.",
    },
    whatsIncluded: [
      "Site assessment", "Unit positioning", "Copper piping", "Drainage",
      "Electrical requirements", "Outdoor condenser installation",
      "Installation", "Testing", "Commissioning",
    ],
    problemHeading: "Getting installation wrong is expensive to fix later",
    problemBody:
      "Poor positioning, bad piping or rushed electrical work can mean a unit that never cools properly, or one that fails early. Our installation process is built to avoid those problems from day one.",
    ctaLabel: "Request an Installation Quote",
    whatsappMessage: (details) =>
      `Hello THURSTECH, I need professional AC installation. I have a ${details || "[AC TYPE]"} at [LOCATION].`,
    faqs: [
      { q: "How long does a typical installation take?", a: "This depends on the unit type, site conditions and any electrical work required. We confirm timing after a site assessment." },
      { q: "Do you install both split and floor-standing units?", a: "Yes - installation covers split, floor-standing and cassette units. Tell us what you have when you request a quote." },
    ],
  },
  {
    slug: "ac-repair",
    navLabel: "AC Repair",
    requestPath: "/request-repair",
    heroHeadline: "AC Not Cooling? Let Us Take a Look.",
    intro:
      "Cooling problems, leaks, strange noises or an AC that will not power on - THURSTECH diagnoses and repairs air conditioning faults for homes and businesses.",
    seo: {
      title: "AC Repair Services in Nigeria | THURSTECH",
      description:
        "Need AC repair? THURSTECH provides air conditioner troubleshooting, repair and maintenance services for residential and commercial customers.",
    },
    whatsIncluded: [
      "AC not cooling", "Water leakage", "Strange sounds", "Poor airflow",
      "Power problems", "Refrigerant issues", "Electrical faults",
      "Compressor problems", "Fan problems", "Drainage problems",
    ],
    problemHeading: "Common AC problems we are asked to fix",
    problemBody:
      "Tell us what is happening with your unit, from a full breakdown to a smaller performance issue, and we will assess and repair it.",
    ctaLabel: "Book AC Repair",
    whatsappMessage: (details) =>
      `Hello THURSTECH, I need AC repair. My AC is ${details || "[PROBLEM]"}. My location is [LOCATION].`,
    faqs: [
      { q: "Can I send a photo or video of the problem?", a: "Yes - the repair request form supports a photo/video upload, which helps us understand the issue before we arrive." },
      { q: "Do you repair all AC brands?", a: "Tell us your AC brand and model when you book, and we will confirm whether we can service it." },
    ],
  },
  {
    slug: "ac-servicing",
    navLabel: "AC Servicing",
    requestPath: "/request-a-quote",
    heroHeadline: "Air Conditioner Servicing & Maintenance",
    intro:
      "Regular servicing keeps your AC clean, efficient and reliable. THURSTECH offers filter, coil, condenser and drain cleaning plus full performance checks.",
    seo: {
      title: "AC Servicing & Maintenance in Nigeria | THURSTECH",
      description:
        "Professional air conditioner servicing and maintenance for homes, offices and businesses. Contact THURSTECH for AC service support.",
    },
    whatsIncluded: [
      "Filter cleaning", "Coil cleaning", "Condenser cleaning", "Drain cleaning",
      "Visual inspection", "Performance testing", "Electrical checks",
      "Refrigerant pressure checks where appropriate",
    ],
    problemHeading: "Why regular servicing matters",
    problemBody:
      "A dirty or neglected AC has to work harder. Routine servicing is the simplest way to keep a unit running the way it was designed to.",
    ctaLabel: "Book a Service",
    whatsappMessage: () => `Hello THURSTECH, I would like to request a quote for AC Servicing.`,
    faqs: [
      { q: "How often should an AC be serviced?", a: "This depends on usage and environment. Get in touch and we will recommend a schedule for your setup." },
    ],
  },
  {
    slug: "ac-maintenance",
    navLabel: "AC Maintenance",
    requestPath: "/request-a-quote",
    heroHeadline: "Preventive AC Maintenance",
    intro:
      "Scheduled maintenance helps catch small issues before they become expensive repairs, for single units or multi-unit commercial sites.",
    seo: {
      title: "AC Maintenance Services in Nigeria | THURSTECH",
      description: "Preventive air conditioner maintenance from THURSTECH Nigeria Limited, for homes, offices and commercial sites.",
    },
    whatsIncluded: ["Scheduled inspections", "Preventive maintenance", "Performance testing", "Electrical checks"],
    problemHeading: "Stay ahead of breakdowns",
    problemBody: "Maintenance is about catching problems early rather than waiting for a full breakdown.",
    ctaLabel: "Request a Quote",
    whatsappMessage: () => `Hello THURSTECH, I would like to request a quote for AC Maintenance.`,
    faqs: [],
  },
  {
    slug: "ac-relocation",
    navLabel: "AC Relocation",
    requestPath: "/request-a-quote",
    heroHeadline: "AC Relocation & Dismantling",
    intro: "Moving house or reorganising your space? THURSTECH safely dismantles, relocates and reinstalls air conditioning units.",
    seo: {
      title: "AC Relocation Services in Nigeria | THURSTECH",
      description: "Air conditioner relocation and dismantling services from THURSTECH Nigeria Limited.",
    },
    whatsIncluded: ["Dismantling", "Safe transport handling", "Reinstallation", "Testing"],
    problemHeading: "Moving an AC unit safely",
    problemBody: "Relocating a unit incorrectly can damage it or void a warranty. Our team handles dismantling and reinstallation properly.",
    ctaLabel: "Request a Quote",
    whatsappMessage: () => `Hello THURSTECH, I would like to request a quote for AC Relocation.`,
    faqs: [],
  },
  {
    slug: "commercial-hvac",
    navLabel: "Commercial HVAC",
    requestPath: "/request-a-quote",
    heroHeadline: "Commercial HVAC Solutions",
    intro: "THURSTECH supports offices, shops and other commercial sites with cooling solutions sized for the space and how it is used.",
    seo: {
      title: "Commercial HVAC Services in Nigeria | THURSTECH",
      description: "Commercial air conditioning and HVAC solutions from THURSTECH Nigeria Limited for offices and business premises.",
    },
    whatsIncluded: ["Site assessment", "Equipment recommendation", "Installation", "Servicing and maintenance"],
    problemHeading: "Cooling for business environments",
    problemBody: "Commercial spaces have different cooling demands from a single room at home. Tell us about your site and we will advise on the right approach.",
    ctaLabel: "Request a Commercial Quote",
    whatsappMessage: () => `Hello THURSTECH, I would like to request a quote for a Commercial HVAC project.`,
    faqs: [],
    // Potential sectors (offices, shops, restaurants, hotels, schools,
    // churches, hospitals, estates, warehouses, event centres) are listed in
    // the blueprint as sectors to evaluate. Only publish sectors THURSTECH
    // actually serves - none are hard-coded yet.
    sectors: [],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
