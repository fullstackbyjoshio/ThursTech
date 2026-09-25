-- ============================================================================
-- THURSTECH NIGERIA LIMITED — Storage bucket + policies
--
-- Run AFTER schema.sql and rls_policies.sql. Creates the "uploads" bucket
-- used for quote/repair request photos and product/project images, and
-- locks it down so visitors can only upload into request-specific folders,
-- not browse or overwrite each other's files.
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

-- Public visitors can upload a file when submitting the Quote or Repair
-- forms. The frontend writes to "quote-requests/..." and "repair-requests/..."
-- paths only (see src/pages/RequestQuote.jsx and RequestRepair.jsx).
create policy "uploads_public_insert_request_photos" on storage.objects
  for insert
  with check (
    bucket_id = 'uploads'
    and (
      (storage.foldername(name))[1] = 'quote-requests'
      or (storage.foldername(name))[1] = 'repair-requests'
    )
  );

-- The bucket is public so uploaded photos and product/project images can be
-- displayed on the site via their public URL.
create policy "uploads_public_select" on storage.objects
  for select using (bucket_id = 'uploads');

-- Only admins can upload into the product/project image folders, and only
-- admins can update or delete any file (including customer-submitted photos).
create policy "uploads_admin_insert_catalogue_images" on storage.objects
  for insert
  with check (
    bucket_id = 'uploads'
    and (
      (storage.foldername(name))[1] = 'products'
      or (storage.foldername(name))[1] = 'projects'
    )
    and public.is_admin()
  );

create policy "uploads_admin_update" on storage.objects
  for update using (bucket_id = 'uploads' and public.is_admin());

create policy "uploads_admin_delete" on storage.objects
  for delete using (bucket_id = 'uploads' and public.is_admin());
