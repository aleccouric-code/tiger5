-- Sandie: group rounds (score friends' rounds), Venmo handles, scorecard photos.
-- Run once in Supabase after social.sql. Safe to run again.

-- Group rounds: you can score a friend's round for them. entered_by records who entered it.
alter table public.rounds add column if not exists entered_by uuid references public.profiles on delete set null;
alter table public.rounds add column if not exists scorecards text[] not null default '{}';

drop policy if exists "rounds insert own" on public.rounds;
create policy "rounds insert own" on public.rounds for insert to authenticated
  with check (
    (user_id = auth.uid() and (entered_by is null or entered_by = auth.uid()))
    or (entered_by = auth.uid() and private.are_friends(auth.uid(), user_id))
  );
drop policy if exists "rounds update own" on public.rounds;
create policy "rounds update own" on public.rounds for update to authenticated
  using (user_id = auth.uid() or entered_by = auth.uid())
  with check (user_id = auth.uid() or (entered_by = auth.uid() and private.are_friends(auth.uid(), user_id)));
drop policy if exists "rounds delete own" on public.rounds;
create policy "rounds delete own" on public.rounds for delete to authenticated
  using (user_id = auth.uid() or entered_by = auth.uid());

-- Venmo handle: a separate table so only you and your friends can read it.
create table if not exists public.profile_private (
  id     uuid primary key references public.profiles on delete cascade,
  venmo  text check (venmo is null or venmo ~ '^[A-Za-z0-9_-]{5,30}$')
);
alter table public.profile_private enable row level security;
drop policy if exists "private read friends" on public.profile_private;
create policy "private read friends" on public.profile_private for select to authenticated
  using (id = auth.uid() or private.are_friends(auth.uid(), id));
drop policy if exists "private write own" on public.profile_private;
create policy "private write own" on public.profile_private for insert to authenticated with check (id = auth.uid());
drop policy if exists "private update own" on public.profile_private;
create policy "private update own" on public.profile_private for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Scorecard photos (front/back) for courses not in the app: private, files under <your id>/.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('scorecards', 'scorecards', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create or replace function private.path_owner(path text)
returns uuid language sql immutable set search_path = '' as $$
  select case when split_part(path, '/', 1) ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    then split_part(path, '/', 1)::uuid end;
$$;
revoke all on all functions in schema private from public, anon;
grant execute on all functions in schema private to authenticated;

drop policy if exists "scorecards upload own" on storage.objects;
create policy "scorecards upload own" on storage.objects for insert to authenticated
  with check (bucket_id = 'scorecards' and private.path_owner(name) = auth.uid());
drop policy if exists "scorecards read" on storage.objects;
create policy "scorecards read" on storage.objects for select to authenticated
  using (bucket_id = 'scorecards' and (private.path_owner(name) = auth.uid() or private.are_friends(auth.uid(), private.path_owner(name))));
drop policy if exists "scorecards delete own" on storage.objects;
create policy "scorecards delete own" on storage.objects for delete to authenticated
  using (bucket_id = 'scorecards' and private.path_owner(name) = auth.uid());
