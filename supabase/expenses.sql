-- Tiger 5 trip expenses and receipt photos.
-- Run once in Supabase after trips.sql: SQL Editor → New query → paste → Run.
-- Safe to run again. Tracking only: the app never moves money.

create table if not exists public.expenses (
  id            uuid primary key,
  trip_id       uuid not null references public.trips on delete cascade,
  description   text not null check (char_length(trim(description)) between 1 and 80),
  amount        numeric(10,2) not null check (amount > 0 and amount < 100000),
  paid_by       uuid not null references public.profiles on delete cascade,
  split_among   uuid[] not null check (array_length(split_among, 1) >= 1),
  spent_on      date,
  receipt_path  text,
  created_by    uuid not null default auth.uid() references public.profiles on delete cascade,
  created_at    timestamptz not null default now()
);
create index if not exists expenses_trip on public.expenses (trip_id);

alter table public.expenses enable row level security;

-- Everyone on the trip sees and logs expenses; the person who logged it,
-- the person who paid, or the organizer can change or delete it.
drop policy if exists "expenses read" on public.expenses;
create policy "expenses read" on public.expenses for select to authenticated
  using (private.is_trip_member(trip_id, auth.uid()));
drop policy if exists "expenses add" on public.expenses;
create policy "expenses add" on public.expenses for insert to authenticated
  with check (created_by = auth.uid() and private.is_trip_member(trip_id, auth.uid())
    and private.is_trip_member(trip_id, paid_by));
drop policy if exists "expenses change" on public.expenses;
create policy "expenses change" on public.expenses for update to authenticated
  using (created_by = auth.uid() or paid_by = auth.uid() or private.is_trip_owner(trip_id, auth.uid()))
  with check (private.is_trip_member(trip_id, paid_by));
drop policy if exists "expenses delete" on public.expenses;
create policy "expenses delete" on public.expenses for delete to authenticated
  using (created_by = auth.uid() or paid_by = auth.uid() or private.is_trip_owner(trip_id, auth.uid()));

-- Receipt photos: private bucket, files stored as <trip id>/<expense id>.<ext>.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('receipts', 'receipts', false, 5242880, array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- The trip id from a receipt's path, or null if the path isn't shaped right.
create or replace function private.receipt_trip(path text)
returns uuid language sql immutable set search_path = '' as $$
  select case when split_part(path, '/', 1) ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    then split_part(path, '/', 1)::uuid end;
$$;
revoke all on all functions in schema private from public, anon;
grant execute on all functions in schema private to authenticated;

drop policy if exists "receipts read" on storage.objects;
create policy "receipts read" on storage.objects for select to authenticated
  using (bucket_id = 'receipts' and private.is_trip_member(private.receipt_trip(name), auth.uid()));
drop policy if exists "receipts upload" on storage.objects;
create policy "receipts upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'receipts' and private.is_trip_member(private.receipt_trip(name), auth.uid()));
drop policy if exists "receipts delete" on storage.objects;
create policy "receipts delete" on storage.objects for delete to authenticated
  using (bucket_id = 'receipts' and (owner_id = auth.uid()::text or private.is_trip_owner(private.receipt_trip(name), auth.uid())));
