-- Follow friends' rounds: live scores work outside trips too (friends can see them),
-- and a new notification type, 'follow', for "X is on the course" and "X shot 82".

-- Live scores no longer need a trip. Friends of the player can see them; trip players
-- can see trip rounds as before.
alter table public.live_scores alter column trip_id drop not null;
drop policy if exists "live read" on public.live_scores;
drop policy if exists "live add" on public.live_scores;
drop policy if exists "live change" on public.live_scores;
create policy "live read" on public.live_scores for select to authenticated using (
  user_id = auth.uid() or entered_by = auth.uid() or private.are_friends(auth.uid(), user_id)
  or (trip_id is not null and (private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid()))));
create policy "live add" on public.live_scores for insert to authenticated with check (
  entered_by = auth.uid() and (user_id = auth.uid() or private.are_friends(auth.uid(), user_id))
  and (trip_id is null or (private.is_trip_member(trip_id, auth.uid()) and private.is_trip_member(trip_id, user_id))));
create policy "live change" on public.live_scores for update to authenticated
  using (entered_by = auth.uid())
  with check (entered_by = auth.uid() and (user_id = auth.uid() or private.are_friends(auth.uid(), user_id))
              and (trip_id is null or (private.is_trip_member(trip_id, auth.uid()) and private.is_trip_member(trip_id, user_id))));

alter table public.push_prefs drop constraint if exists push_prefs_off_check;
alter table public.push_prefs add constraint push_prefs_off_check
  check (off <@ array['friends','social','rounds','board','money','titles','trips','follow']);

create or replace function private.friends_of(u uuid) returns uuid[]
language sql stable security definer set search_path = '' as $$
  select coalesce(array_agg(case when f.requester = u then f.addressee else f.requester end), '{}')
  from public.friendships f where f.status = 'accepted' and u in (f.requester, f.addressee)
$$;

-- "X is on the course": once per round, from the phone keeping score (its own row),
-- to the scorer's friends who aren't playing in that group.
create or replace function private.tg_push_live() returns trigger
language plpgsql security definer set search_path = '' as $$
declare playing uuid[];
begin
  if new.user_id <> new.entered_by then return null; end if;
  playing := array(select l.user_id from public.live_scores l where l.entered_by = new.entered_by);
  perform private.push(
    array(select f from unnest(private.friends_of(new.user_id)) f where not (f = any(playing))),
    'follow', private.hname(new.user_id) || ' is on the course',
    new.course || ' · Tap to follow along.', '?go=feed', 'live-' || new.user_id);
  return null;
end $$;
drop trigger if exists push_live on public.live_scores;
create trigger push_live after insert on public.live_scores for each row execute function private.tg_push_live();

-- Posted rounds: the player's friends hear the score (not the person who scored it,
-- and not anyone who posted a round at the same course that day, i.e. played with them).
-- Rounds scored for you by a friend still send "X posted your round".
create or replace function private.tg_push_round() returns trigger
language plpgsql security definer set search_path = '' as $$
declare amt numeric; fans uuid[];
begin
  if new.entered_by is not null and new.entered_by <> new.user_id then
    amt := round(coalesce((new.games -> 'net' ->> new.user_id::text)::numeric, 0), 2);
    perform private.push(array[new.user_id], 'rounds', private.hname(new.entered_by) || ' posted your round',
      coalesce(new.course, 'Your round') || coalesce(' · you shot ' || new.score, '') || '.'
        || case when new.games is null then ' Tap to see it.'
                when amt >= 0.01 then ' You won ' || private.money(amt) || ' in the games 🎉'
                when amt <= -0.01 then ' You lost ' || private.money(-amt) || ' in the games.'
                else ' You broke even in the games.' end,
      '?go=round&id=' || new.id, 'round-' || new.id);
  end if;
  if coalesce(new.imported, false) then return null; end if; -- bulk imports of old rounds stay quiet
  fans := array(select f from unnest(private.friends_of(new.user_id)) f
                where f is distinct from new.entered_by
                  and not exists (select 1 from public.rounds o where o.user_id = f and o.date = new.date and o.course = new.course));
  perform private.push(fans, 'follow',
    private.hname(new.user_id) || case when new.complete then ' shot ' || new.score
      || ' (' || case when new.score - coalesce(new.par_played, new.par) > 0 then '+' else '' end
      || case when new.score = coalesce(new.par_played, new.par) then 'E' else (new.score - coalesce(new.par_played, new.par))::text end || ')'
      else ' posted ' || coalesce(new.holes_played, 0) || ' holes' end,
    coalesce(new.course, 'A round') || ' · Tap to see the card.', '?go=round&id=' || new.id, 'round-' || new.id);
  return null;
end $$;

revoke execute on function private.friends_of(uuid) from public, anon, authenticated;
