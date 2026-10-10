-- Trip tee times: each row is one group (up to 4 players) at a time and course on a day.
-- Anyone on the trip can plan them; every player in a group must be on the trip.
create or replace function private.all_trip_members(trip uuid, us uuid[]) returns boolean
language sql stable security definer set search_path = '' as $$
  select not exists (select 1 from unnest(us) u where not private.is_trip_member(trip, u))
$$;

create table if not exists public.tee_times (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  day date not null,
  time time not null,
  course text not null check (char_length(trim(course)) between 1 and 80),
  course_key text check (course_key is null or char_length(course_key) <= 40),
  tee text check (tee is null or char_length(tee) <= 40),
  players uuid[] not null default '{}' check (cardinality(players) <= 4),
  note text check (note is null or char_length(note) <= 120),
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists tee_times_trip on public.tee_times (trip_id, day, time);
alter table public.tee_times enable row level security;

create policy "tee times read" on public.tee_times for select to authenticated using (
  private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid()));
create policy "tee times add" on public.tee_times for insert to authenticated with check (
  created_by = auth.uid()
  and (private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid()))
  and private.all_trip_members(trip_id, players));
create policy "tee times change" on public.tee_times for update to authenticated
  using (private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid()))
  with check ((private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid()))
              and private.all_trip_members(trip_id, players));
create policy "tee times remove" on public.tee_times for delete to authenticated using (
  private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid()));

-- Live scores: where each player stands in a round that's being played right now on a
-- trip. The phone keeping score updates it as holes are entered and deletes it on posting.
create table if not exists public.live_scores (
  round_id uuid primary key,
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  entered_by uuid not null default auth.uid(),
  course text not null check (char_length(course) <= 80),
  thru int not null check (thru between 0 and 18),
  holes int not null check (holes in (9, 18)),
  to_par int not null check (to_par between -40 and 120),
  score int not null check (score between 0 and 300),
  updated_at timestamptz not null default now()
);
create index if not exists live_scores_trip on public.live_scores (trip_id);
alter table public.live_scores enable row level security;
create policy "live read" on public.live_scores for select to authenticated using (
  private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid()));
create policy "live add" on public.live_scores for insert to authenticated with check (
  entered_by = auth.uid() and private.is_trip_member(trip_id, auth.uid()) and private.is_trip_member(trip_id, user_id)
  and (user_id = auth.uid() or private.are_friends(auth.uid(), user_id)));
create policy "live change" on public.live_scores for update to authenticated
  using (entered_by = auth.uid())
  with check (entered_by = auth.uid() and private.is_trip_member(trip_id, auth.uid()) and private.is_trip_member(trip_id, user_id)
              and (user_id = auth.uid() or private.are_friends(auth.uid(), user_id)));
create policy "live remove" on public.live_scores for delete to authenticated using (entered_by = auth.uid() or user_id = auth.uid());

-- New notification category for trip plans.
alter table public.push_prefs drop constraint if exists push_prefs_off_check;
alter table public.push_prefs add constraint push_prefs_off_check
  check (off <@ array['friends','social','rounds','board','money','titles','trips']);

create or replace function private.tg_push_teetime() returns trigger
language plpgsql security definer set search_path = '' as $$
declare t public.trips; actor uuid := auth.uid(); others uuid[]; added uuid[]; kept uuid[]; line text; mates text;
begin
  select * into t from public.trips where id = new.trip_id;
  line := to_char(new.time, 'FMHH12:MI AM') || ' at ' || new.course;
  if tg_op = 'INSERT' then
    added := new.players;
  else
    if new.players is not distinct from old.players and new.time = old.time and new.day = old.day and new.course = old.course then return null; end if;
    added := array(select u from unnest(new.players) u where not (u = any(old.players)));
    kept := array(select u from unnest(new.players) u where u = any(old.players));
  end if;
  added := array(select u from unnest(added) u where u is distinct from actor);
  kept := array(select u from unnest(coalesce(kept, '{}')) u where u is distinct from actor);
  mates := (select string_agg(private.hname(u), ', ') from unnest(new.players) u);
  perform private.push(added, 'trips', 'You''re in the ' || line,
    to_char(new.day, 'Dy, Mon FMDD') || ' · ' || coalesce(t.name, 'Trip') || ' · ' || coalesce(mates, ''), '?go=trip&id=' || new.trip_id, 'tee-' || new.id);
  perform private.push(kept, 'trips', 'Tee time changed: ' || line,
    to_char(new.day, 'Dy, Mon FMDD') || ' · ' || coalesce(t.name, 'Trip') || ' · ' || coalesce(mates, ''), '?go=trip&id=' || new.trip_id, 'tee-' || new.id);
  return null;
end $$;
drop trigger if exists push_teetime on public.tee_times;
create trigger push_teetime after insert or update on public.tee_times for each row execute function private.tg_push_teetime();

-- Row-level rules call this as the signed-in user.
revoke execute on function private.all_trip_members(uuid, uuid[]) from public, anon;
grant execute on function private.all_trip_members(uuid, uuid[]) to authenticated;
