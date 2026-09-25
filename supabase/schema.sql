-- ============================================================================
-- THURSTECH NIGERIA LIMITED — Supabase schema
--
-- Run this in the Supabase SQL editor (or via the CLI) on a fresh project,
-- BEFORE rls_policies.sql. See docs/SETUP_SUPABASE.md for the full walkthrough.
-- ============================================================================

-- Required for gen_random_uuid()
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles: one row per authenticated user (customers and admins alike)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  role text default 'customer',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- admin_users: whitelist of users who are allowed into /admin.
-- Add a row here (with the matching auth.users id) for every staff member.
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  unique (user_id)
);

-- ---------------------------------------------------------------------------
-- quote_requests: the general "Request a Quote" form + Contact form
-- ---------------------------------------------------------------------------
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  email text,
  phone text,
  whatsapp text,
  service_type text,
  ac_type text,
  capacity text,
  location text,
  description text,
  photo_url text,
  status text not null default 'New',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep existing projects compatible with the quote form's preferred contact
-- field when this schema is applied after the table already exists.
alter table public.quote_requests
  add column if not exists preferred_contact text;

-- ---------------------------------------------------------------------------
-- repair_requests: the dedicated "Book AC Repair" form
-- ---------------------------------------------------------------------------
create table if not exists public.repair_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  email text,
  phone text,
  whatsapp text,
  brand text,
  model text,
  problem text,
  location text,
  description text,
  photo_url text,
  preferred_date date,
  status text not null default 'New',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- service_requests: reserved for a future dedicated servicing/maintenance
-- booking form (the admin dashboard already reads from this table). Until
-- that form exists, servicing enquiries flow through quote_requests.
-- ---------------------------------------------------------------------------
create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  email text,
  phone text,
  service_type text,
  location text,
  description text,
  preferred_date date,
  status text not null default 'New',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- products: the Shop AC catalogue
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  brand text,
  name text,
  model text,
  category text,
  capacity text,
  type text,
  refrigerant text,
  voltage text,
  price numeric,
  availability text,
  warranty text,
  description text,
  specifications text,
  image_url text,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- projects: real, completed work with before/during/after photos
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text,
  location text,
  service text,
  description text,
  cover_image text,
  gallery jsonb not null default '[]'::jsonb,
  project_date date,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- testimonials: real customer reviews only, gated behind admin approval
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  review text,
  rating int check (rating between 1 and 5),
  approved boolean not null default false,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- faqs
-- ---------------------------------------------------------------------------
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  published boolean not null default true,
  sort_order int not null default 0
);

-- Helpful indexes for the admin dashboard's filters/search and lead sorting
create index if not exists idx_quote_requests_status on public.quote_requests (status);
create index if not exists idx_repair_requests_status on public.repair_requests (status);
create index if not exists idx_service_requests_status on public.service_requests (status);
create index if not exists idx_products_active_featured on public.products (active, featured);
create index if not exists idx_projects_featured on public.projects (featured);
