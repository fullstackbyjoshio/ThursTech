# THURSTECH Nigeria Limited — Website

A production-ready website and lead-management system for THURSTECH Nigeria
Limited (RC: 1577031), an AC sales, installation, repair and servicing
company — built from the supplied business blueprint.

**Buy it. Install it. Maintain it. Repair it.**

## Stack

- **Frontend:** React 18 + Vite + React Router + Tailwind CSS
- **Database / Auth / Storage:** Supabase (Postgres + Row Level Security)
- **Email notifications:** EmailJS
- **SEO:** react-helmet-async (per-page title, description, canonical, Open
  Graph, Twitter card)

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Supabase + EmailJS keys
npm run dev
```

The site works and looks correct even with a blank `.env` — forms simply log
a warning instead of saving/sending, and product/project/FAQ/testimonial
sections show an honest "coming soon" empty state instead of fake data.

To get the database, admin login and email notifications actually working,
follow, in order:

1. [`docs/SETUP_SUPABASE.md`](docs/SETUP_SUPABASE.md)
2. [`docs/SETUP_EMAILJS.md`](docs/SETUP_EMAILJS.md)
3. [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) when you're ready to ship

## Project structure

```
src/
  components/
    layout/       Header, Footer, mobile Call/WhatsApp/Quote bar, page shell
    ui/            Shared building blocks (Button, Seo, StatusBadge, ...)
    home/          Homepage sections (Hero, Need cards, Services, ...)
  pages/           One file per public route
  admin/           /admin dashboard: login, layout, dashboard, lead & content
                   management (products, projects, testimonials, FAQs, leads)
  data/            Confirmed business facts, nav structure, service content
  lib/             Supabase client, EmailJS helper, WhatsApp link builder
  hooks/           useAuth (session + admin-role check)
supabase/
  schema.sql              All tables
  rls_policies.sql         Row Level Security policies
  storage_policies.sql     Storage bucket + upload policies
docs/                      Setup and deployment guides
```

## What's real vs. what needs THURSTECH's input

Per the blueprint's own instruction, this build does **not** invent business
facts. Specifically:

- **Confirmed and used as-is:** company name, RC number, both phone numbers,
  email, and the four service pillars (sales, installation, repair,
  servicing/maintenance) plus relocation and commercial HVAC.
- **Left blank / not yet added:** physical address, opening hours, social
  media links, testimonials, project photos, product inventory, and any
  location-specific SEO pages (Lagos/Ogun/Ibadan/Abuja area pages) — the
  blueprint says these should only go live once THURSTECH confirms them.
  `src/data/business.js` has a comment marking exactly where to add these.
- **No fake data anywhere:** the Shop, Projects, FAQ and testimonials
  sections pull live from Supabase and show an empty state until real rows
  exist — there are no placeholder products, project counts, or reviews
  anywhere in the codebase.

## Admin dashboard

`/admin/login` → `/admin`. Protected by Supabase Auth in the UI and by
Postgres Row Level Security in the database (so hiding the link is not what
keeps it secure — the database itself enforces it). See
`docs/SETUP_SUPABASE.md` for creating your first admin account.

Covers: dashboard stats, Quote/Repair/Service request management (status
pipeline: New → Contacted → Assessment Scheduled → Quotation Sent →
Approved → In Progress → Completed → Cancelled, with notes, search, filter
and delete), a merged Customers/Leads view, and full CRUD for Products,
Projects, Testimonials and FAQs.

## Known gaps to close before launch

- The favicon package is installed. Add the official THURSTECH wordmark under
  `public/webmark/` once supplied (do not redraw or recolor it).
- Verify `public/og-image.png` is the final branded social share image.
- Swap the domain placeholder `www.thurstech.com.ng` for the real domain in
  `src/components/ui/Seo.jsx`, `public/sitemap.xml` and `public/robots.txt`.
- Run the Supabase SQL files and create the first admin account.
- Populate real products, projects, FAQs and (verified) testimonials.
