# Supabase Setup

This project uses Supabase for the database, authentication and file storage
behind every form and the admin dashboard.

## 1. Create a project

1. Go to https://supabase.com and create a new project.
2. Once it's ready, open **Project Settings → API**.
3. Copy the **Project URL** and the **anon public** key (not the
   service_role/secret key — that one must never be used in this frontend).

## 2. Configure environment variables

Copy `.env.example` to `.env` in the project root and fill in:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

`.env` is already in `.gitignore` — never commit it.

## 3. Create the database schema

Open **SQL Editor** in the Supabase dashboard and run, in this exact order:

1. `supabase/schema.sql` — creates all tables (products, projects,
   quote_requests, repair_requests, service_requests, testimonials, faqs,
   profiles, admin_users).
2. `supabase/rls_policies.sql` — enables Row Level Security and adds the
   policies that let visitors submit forms and read published content,
   while restricting customer data and full read/write access to admins only.
3. `supabase/storage_policies.sql` — creates the public `uploads` storage
   bucket used for quote/repair request photos and product/project images,
   with policies restricting who can upload where.

## 4. Create your first admin user

1. In the Supabase dashboard go to **Authentication → Users → Add user**
   and create an account with your email and a password.
2. Copy that user's UUID.
3. In the SQL editor, run:

```sql
insert into public.admin_users (user_id, role)
values ('paste-the-user-uuid-here', 'admin');
```

4. Sign in at `/admin/login` with that email/password. You should now see
   the admin dashboard.

New admins should always be added this way (directly in the SQL editor or
Supabase dashboard) — the application itself intentionally has no way to
grant admin access, so it can't be used to self-promote an account.

## 5. Add your first product / project / FAQ

Once signed in, use **Products**, **Projects** and **FAQs** in the admin
sidebar. Nothing is pre-populated with fake data — the public site shows an
honest "coming soon" empty state until real content is added.

## Notes on security

- The anon key is safe to expose in frontend code — every table it can touch
  is protected by the RLS policies in `rls_policies.sql`.
- The service-role/secret key is never used anywhere in this project. If you
  ever need it (e.g. for a future server-side integration), keep it out of
  any frontend code and any committed file.
