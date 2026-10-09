-- Tiger 5 trips and side bets.
-- Run once in Supabase after schema.sql: SQL Editor → New query → paste → Run.
-- Safe to run again.

-- Trips ----------------------------------------------------------------------
create table if not exists public.trips (
  id          uuid primary key,
  name        text not null check (char_length(trim(name)) between 1 and 60),
  start_date  date not null,
  end_date    date not null,
  created_by  uuid not null default auth.uid() references public.profiles on delete cascade,
  created_at  timestamptz not null default now(),
  check (end_date >= start_date)
);
-- Set when the organizer ends a trip early; the trip then counts as completed.
alter table public.trips add column if not exists ended_at timestamptz;

create table if not exists public.trip_members (
  trip_id   uuid not null references public.trips on delete cascade,
  user_id   uuid not null references public.profiles on delete cascade,
  added_at  timestamptz not null default now(),
  primary key (trip_id, user_id)
);

-- Side bets --------------------------------------------------------------------
-- kind decides how the winner is worked out from trip rounds; 'custom' bets
-- have their winners picked by hand.
create table if not exists public.bets (
  id          uuid primary key,
  trip_id     uuid not null references public.trips on delete cascade,
  kind        text not null check (kind in ('putts','gross','net','t5','birdies','three_putts','best_round','custom')),
  name        text not null check (char_length(trim(name)) between 1 and 60),
  stake       numeric(8,2) not null default 0 check (stake >= 0),
  scoring     text not null default 'total' check (scoring in ('total','avg')),
  winners     uuid[] not null default '{}',
  created_by  uuid default auth.uid() references public.profiles on delete set null,
  created_at  timestamptz not null default now()
);
create index if not exists bets_trip on public.bets (trip_id);

-- Helpers ----------------------------------------------------------------------
create or replace function private.is_trip_member(t uuid, u uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.trip_members where trip_id = t and user_id = u);
$$;

create or replace function private.is_trip_owner(t uuid, u uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.trips where id = t and created_by = u);
$$;

create or replace function private.share_trip(a uuid, b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.trip_members x
    join public.trip_members y on x.trip_id = y.trip_id
    where x.user_id = a and y.user_id = b
  );
$$;

-- True when viewer and owner are on the same trip and the round falls in its dates.
create or replace function private.trip_round_visible(viewer uuid, owner uuid, d date)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.trip_members a
    join public.trip_members b on a.trip_id = b.trip_id
    join public.trips t on t.id = a.trip_id
    where a.user_id = viewer and b.user_id = owner
      and d between t.start_date and t.end_date
  );
$$;

revoke all on all functions in schema private from public, anon;
grant execute on all functions in schema private to authenticated;

-- Row level security -----------------------------------------------------------
alter table public.trips        enable row level security;
alter table public.trip_members enable row level security;
alter table public.bets         enable row level security;

-- Trips: members see them; only the creator changes or deletes them.
drop policy if exists "trips read" on public.trips;
create policy "trips read" on public.trips for select to authenticated
  using (created_by = auth.uid() or private.is_trip_member(id, auth.uid()));
drop policy if exists "trips create" on public.trips;
create policy "trips create" on public.trips for insert to authenticated
  with check (created_by = auth.uid());
drop policy if exists "trips update" on public.trips;
create policy "trips update" on public.trips for update to authenticated
  using (created_by = auth.uid()) with check (created_by = auth.uid());
drop policy if exists "trips delete" on public.trips;
create policy "trips delete" on public.trips for delete to authenticated
  using (created_by = auth.uid());

-- Members: visible to the trip; anyone on the trip adds their own friends;
-- anyone can leave, and the creator can remove people.
drop policy if exists "trip members read" on public.trip_members;
create policy "trip members read" on public.trip_members for select to authenticated
  using (private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid()));
drop policy if exists "trip members add" on public.trip_members;
create policy "trip members add" on public.trip_members for insert to authenticated
  with check (
    -- the organizer adds themself when creating the trip
    (user_id = auth.uid() and private.is_trip_owner(trip_id, auth.uid()))
    -- anyone on the trip (or the organizer) adds one of their own friends
    or ((private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid()))
        and private.are_friends(auth.uid(), user_id))
  );
drop policy if exists "trip members remove" on public.trip_members;
create policy "trip members remove" on public.trip_members for delete to authenticated
  using (user_id = auth.uid() or private.is_trip_owner(trip_id, auth.uid()));

-- Bets: any trip member can add, update (pick winners) and delete them.
drop policy if exists "bets read" on public.bets;
create policy "bets read" on public.bets for select to authenticated
  using (private.is_trip_member(trip_id, auth.uid()));
drop policy if exists "bets add" on public.bets;
create policy "bets add" on public.bets for insert to authenticated
  with check (private.is_trip_member(trip_id, auth.uid()) and created_by = auth.uid());
drop policy if exists "bets update" on public.bets;
create policy "bets update" on public.bets for update to authenticated
  using (private.is_trip_member(trip_id, auth.uid())) with check (private.is_trip_member(trip_id, auth.uid()));
drop policy if exists "bets delete" on public.bets;
create policy "bets delete" on public.bets for delete to authenticated
  using (private.is_trip_member(trip_id, auth.uid()));

-- Trip-mates who aren't friends can see each other's name and trip-dated rounds.
drop policy if exists "profiles read trip" on public.profiles;
create policy "profiles read trip" on public.profiles for select to authenticated
  using (private.share_trip(auth.uid(), id));
drop policy if exists "rounds read trip" on public.rounds;
create policy "rounds read trip" on public.rounds for select to authenticated
  using (private.trip_round_visible(auth.uid(), user_id, date));
