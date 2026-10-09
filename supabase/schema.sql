-- Tiger 5 database schema.
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

-- Players ------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  handle      text not null check (char_length(trim(handle)) between 1 and 30),
  friend_code text not null unique default upper(substr(md5(random()::text), 1, 6)),
  created_at  timestamptz not null default now()
);

-- Friend requests and friendships -------------------------------------------
create table if not exists public.friendships (
  requester  uuid not null references public.profiles on delete cascade,
  addressee  uuid not null references public.profiles on delete cascade,
  status     text not null default 'pending' check (status in ('pending', 'accepted')),
  created_at timestamptz not null default now(),
  primary key (requester, addressee),
  check (requester <> addressee)
);
-- Only one row per pair of players, whichever direction it was sent.
create unique index if not exists friendships_pair
  on public.friendships (least(requester, addressee), greatest(requester, addressee));

-- Rounds -------------------------------------------------------------------
create table if not exists public.rounds (
  id            uuid primary key,
  user_id       uuid not null default auth.uid() references public.profiles on delete cascade,
  course        text not null,
  tee           text,
  rating        numeric(4,1),
  slope         int,
  date          date not null,
  nine          text check (nine in ('front', 'back')),
  holes         jsonb not null,
  n             int not null,
  par           int,
  par_played    int,
  score         int,
  putts         int,
  per           jsonb,
  t5            int,
  ch            int,
  ags           int,
  diff          numeric(4,1),
  complete      boolean not null default false,
  net           int,
  holes_played  int,
  index_at_post numeric(4,1),
  imported      boolean not null default false,
  created_at    timestamptz not null default now()
);
create index if not exists rounds_user_date on public.rounds (user_id, date desc);

-- Helpers (security definer so policies can check friendships without recursion)
create or replace function public.are_friends(a uuid, b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.friendships
    where status = 'accepted'
      and ((requester = a and addressee = b) or (requester = b and addressee = a))
  );
$$;

create or replace function public.are_connected(a uuid, b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.friendships
    where (requester = a and addressee = b) or (requester = b and addressee = a)
  );
$$;

-- Look up a player by friend code without exposing the whole player list.
create or replace function public.find_player(code text)
returns table (id uuid, handle text)
language sql stable security definer set search_path = public as $$
  select p.id, p.handle from public.profiles p
  where auth.uid() is not null and p.friend_code = upper(trim(code));
$$;

revoke all on function public.find_player(text) from public, anon;
grant execute on function public.find_player(text) to authenticated;

-- Row level security ---------------------------------------------------------
alter table public.profiles    enable row level security;
alter table public.friendships enable row level security;
alter table public.rounds      enable row level security;

-- Profiles: see yourself and anyone you have a request or friendship with.
drop policy if exists "profiles read" on public.profiles;
create policy "profiles read" on public.profiles for select to authenticated
  using (id = auth.uid() or public.are_connected(auth.uid(), id));
drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own" on public.profiles for insert to authenticated
  with check (id = auth.uid());
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- Friendships: you see rows you're part of, send requests as yourself,
-- accept requests sent to you, and either side can delete.
drop policy if exists "friendships read" on public.friendships;
create policy "friendships read" on public.friendships for select to authenticated
  using (auth.uid() in (requester, addressee));
drop policy if exists "friendships request" on public.friendships;
create policy "friendships request" on public.friendships for insert to authenticated
  with check (requester = auth.uid() and status = 'pending');
drop policy if exists "friendships accept" on public.friendships;
create policy "friendships accept" on public.friendships for update to authenticated
  using (addressee = auth.uid()) with check (addressee = auth.uid() and status = 'accepted');
drop policy if exists "friendships delete" on public.friendships;
create policy "friendships delete" on public.friendships for delete to authenticated
  using (auth.uid() in (requester, addressee));

-- Rounds: you and your accepted friends can read; only you write yours.
drop policy if exists "rounds read" on public.rounds;
create policy "rounds read" on public.rounds for select to authenticated
  using (user_id = auth.uid() or public.are_friends(auth.uid(), user_id));
drop policy if exists "rounds insert own" on public.rounds;
create policy "rounds insert own" on public.rounds for insert to authenticated
  with check (user_id = auth.uid());
drop policy if exists "rounds update own" on public.rounds;
create policy "rounds update own" on public.rounds for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "rounds delete own" on public.rounds;
create policy "rounds delete own" on public.rounds for delete to authenticated
  using (user_id = auth.uid());
