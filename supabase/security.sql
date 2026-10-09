-- Security hardening (2026-10-09 review).

-- Accepting a friend request may only flip its status. Without this, the
-- person accepting could rewrite `requester` to any user and become their
-- friend without consent (and see their rounds, scorecards and Venmo).
revoke update on public.friendships from authenticated, anon;
grant update (status) on public.friendships to authenticated;

-- Editing an expense can't move it into a trip you aren't in.
drop policy if exists "expenses change" on public.expenses;
create policy "expenses change" on public.expenses for update to authenticated
  using (created_by = auth.uid() or paid_by = auth.uid() or private.is_trip_owner(trip_id, auth.uid()))
  with check ((private.is_trip_member(trip_id, auth.uid()) or private.is_trip_owner(trip_id, auth.uid())) and private.is_trip_member(trip_id, paid_by));

-- Changing a pick can't move it onto a bet you can't see.
drop policy if exists "board picks change" on public.board_picks;
create policy "board picks change" on public.board_picks for update to authenticated
  using (user_id = auth.uid() and private.board_bet_open(bet_id))
  with check (user_id = auth.uid() and private.board_bet_open(bet_id) and private.can_see_board_bet(bet_id, auth.uid()));

-- Cap the size of a round's hole data so nobody can stuff the database.
alter table public.rounds drop constraint if exists rounds_holes_size;
alter table public.rounds add constraint rounds_holes_size check (holes is null or pg_column_size(holes) < 20000);
