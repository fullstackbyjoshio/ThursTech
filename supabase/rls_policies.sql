-- ============================================================================
-- THURSTECH NIGERIA LIMITED — Row Level Security policies
--
-- Run this AFTER schema.sql. Every table that the frontend touches is
-- covered here — the anon/public key used in the browser is only ever as
-- powerful as these policies allow, per docs/SETUP_SUPABASE.md.
--
-- Rule of thumb enforced throughout:
--   * Visitors can SUBMIT forms (insert) but cannot read other people's data.
--   * Visitors can read PUBLISHED/ACTIVE/APPROVED content only.
--   * Only rows present in admin_users get full read/write/delete access.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helper: is_admin() — true if the currently authenticated user has a row
-- in admin_users. Not SECURITY DEFINER on purpose: it only ever needs to see
-- the caller's own row, which the admin_users policy below already allows.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- Enable RLS everywhere
alter table public.profiles enable row level security;
alter table public.admin_users enable row level security;
alter table public.quote_requests enable row level security;
alter table public.repair_requests enable row level security;
alter table public.service_requests enable row level security;
alter table public.products enable row level security;
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own_or_admin" on public.profiles
  for update using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

-- ---------------------------------------------------------------------------
-- admin_users
-- Only self-lookup is allowed from the app (used by useAuth() to check
-- admin status). Deliberately no insert/update/delete policy for
-- authenticated users — add new admins directly in the Supabase dashboard
-- or SQL editor so the app itself can never be used to self-promote a user.
-- ---------------------------------------------------------------------------
create policy "admin_users_select_own" on public.admin_users
  for select using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- quote_requests — public can submit, only admins can read/manage
-- ---------------------------------------------------------------------------
create policy "quote_requests_public_insert" on public.quote_requests
  for insert with check (true);

create policy "quote_requests_admin_select" on public.quote_requests
  for select using (public.is_admin());

create policy "quote_requests_admin_update" on public.quote_requests
  for update using (public.is_admin()) with check (public.is_admin());

create policy "quote_requests_admin_delete" on public.quote_requests
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- repair_requests — public can submit, only admins can read/manage
-- ---------------------------------------------------------------------------
create policy "repair_requests_public_insert" on public.repair_requests
  for insert with check (true);

create policy "repair_requests_admin_select" on public.repair_requests
  for select using (public.is_admin());

create policy "repair_requests_admin_update" on public.repair_requests
  for update using (public.is_admin()) with check (public.is_admin());

create policy "repair_requests_admin_delete" on public.repair_requests
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- service_requests — public can submit, only admins can read/manage
-- ---------------------------------------------------------------------------
create policy "service_requests_public_insert" on public.service_requests
  for insert with check (true);

create policy "service_requests_admin_select" on public.service_requests
  for select using (public.is_admin());

create policy "service_requests_admin_update" on public.service_requests
  for update using (public.is_admin()) with check (public.is_admin());

create policy "service_requests_admin_delete" on public.service_requests
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- products — public can read active listings only; admins manage everything
-- ---------------------------------------------------------------------------
create policy "products_public_select_active" on public.products
  for select using (active = true);

create policy "products_admin_select_all" on public.products
  for select using (public.is_admin());

create policy "products_admin_insert" on public.products
  for insert with check (public.is_admin());

create policy "products_admin_update" on public.products
  for update using (public.is_admin()) with check (public.is_admin());

create policy "products_admin_delete" on public.products
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- projects — public read (no unpublished/draft concept in this schema);
-- admins manage everything
-- ---------------------------------------------------------------------------
create policy "projects_public_select" on public.projects
  for select using (true);

create policy "projects_admin_insert" on public.projects
  for insert with check (public.is_admin());

create policy "projects_admin_update" on public.projects
  for update using (public.is_admin()) with check (public.is_admin());

create policy "projects_admin_delete" on public.projects
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- testimonials — public can read approved reviews only; admins add/manage.
-- No public insert policy: testimonials are added by admin staff after
-- verifying the review is real, per the blueprint's "real reviews only" rule.
-- ---------------------------------------------------------------------------
create policy "testimonials_public_select_approved" on public.testimonials
  for select using (approved = true);

create policy "testimonials_admin_select_all" on public.testimonials
  for select using (public.is_admin());

create policy "testimonials_admin_insert" on public.testimonials
  for insert with check (public.is_admin());

create policy "testimonials_admin_update" on public.testimonials
  for update using (public.is_admin()) with check (public.is_admin());

create policy "testimonials_admin_delete" on public.testimonials
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- faqs — public can read published FAQs only; admins manage everything
-- ---------------------------------------------------------------------------
create policy "faqs_public_select_published" on public.faqs
  for select using (published = true);

create policy "faqs_admin_select_all" on public.faqs
  for select using (public.is_admin());

create policy "faqs_admin_insert" on public.faqs
  for insert with check (public.is_admin());

create policy "faqs_admin_update" on public.faqs
  for update using (public.is_admin()) with check (public.is_admin());

create policy "faqs_admin_delete" on public.faqs
  for delete using (public.is_admin());
