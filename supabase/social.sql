-- Tiger 5 likes, comments and attests on rounds.
-- Run once in Supabase after trips.sql: SQL Editor → New query → paste → Run.
-- Safe to run again.

create table if not exists public.round_likes (
  round_id    uuid not null references public.rounds on delete cascade,
  user_id     uuid not null references public.profiles on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (round_id, user_id)
);
create table if not exists public.round_comments (
  id          uuid primary key,
  round_id    uuid not null references public.rounds on delete cascade,
  user_id     uuid not null default auth.uid() references public.profiles on delete cascade,
  body        text not null check (char_length(trim(body)) between 1 and 500),
  created_at  timestamptz not null default now()
);
create index if not exists round_comments_round on public.round_comments (round_id, created_at);
-- An attest is someone else vouching for a round's score.
create table if not exists public.round_attests (
  round_id    uuid not null references public.rounds on delete cascade,
  user_id     uuid not null references public.profiles on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (round_id, user_id)
);

-- You can see a round if it's yours, a friend's, or a trip-mate's from the trip dates.
create or replace function private.can_see_round(rid uuid, u uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.rounds r where r.id = rid
      and (r.user_id = u or private.are_friends(u, r.user_id) or private.trip_round_visible(u, r.user_id, r.date))
  );
$$;
create or replace function private.round_owner(rid uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select user_id from public.rounds where id = rid;
$$;
-- Names of people who liked, commented on or attested a round you can see.
create or replace function private.round_social_player(viewer uuid, p uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.round_likes l where l.user_id = p and private.can_see_round(l.round_id, viewer))
      or exists (select 1 from public.round_comments c where c.user_id = p and private.can_see_round(c.round_id, viewer))
      or exists (select 1 from public.round_attests a where a.user_id = p and private.can_see_round(a.round_id, viewer));
$$;
revoke all on all functions in schema private from public, anon;
grant execute on all functions in schema private to authenticated;

alter table public.round_likes    enable row level security;
alter table public.round_comments enable row level security;
alter table public.round_attests  enable row level security;

drop policy if exists "likes read" on public.round_likes;
create policy "likes read" on public.round_likes for select to authenticated
  using (private.can_see_round(round_id, auth.uid()));
drop policy if exists "likes add" on public.round_likes;
create policy "likes add" on public.round_likes for insert to authenticated
  with check (user_id = auth.uid() and private.can_see_round(round_id, auth.uid()));
drop policy if exists "likes remove" on public.round_likes;
create policy "likes remove" on public.round_likes for delete to authenticated
  using (user_id = auth.uid());

drop policy if exists "comments read" on public.round_comments;
create policy "comments read" on public.round_comments for select to authenticated
  using (private.can_see_round(round_id, auth.uid()));
drop policy if exists "comments add" on public.round_comments;
create policy "comments add" on public.round_comments for insert to authenticated
  with check (user_id = auth.uid() and private.can_see_round(round_id, auth.uid()));
drop policy if exists "comments remove" on public.round_comments;
create policy "comments remove" on public.round_comments for delete to authenticated
  using (user_id = auth.uid() or private.round_owner(round_id) = auth.uid());

-- Anyone who can see a round, except its owner, can attest it.
drop policy if exists "attests read" on public.round_attests;
create policy "attests read" on public.round_attests for select to authenticated
  using (private.can_see_round(round_id, auth.uid()));
drop policy if exists "attests add" on public.round_attests;
create policy "attests add" on public.round_attests for insert to authenticated
  with check (user_id = auth.uid() and private.can_see_round(round_id, auth.uid())
    and private.round_owner(round_id) <> auth.uid());
drop policy if exists "attests remove" on public.round_attests;
create policy "attests remove" on public.round_attests for delete to authenticated
  using (user_id = auth.uid());

drop policy if exists "profiles read social" on public.profiles;
create policy "profiles read social" on public.profiles for select to authenticated
  using (private.round_social_player(auth.uid(), id));
