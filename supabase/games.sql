-- Money games (Skins, Nassau) played in a group round. The app scores them and saves
-- the result, including who pays whom, on every player's round in the group.
alter table public.rounds add column if not exists games jsonb;
alter table public.rounds drop constraint if exists rounds_games_size;
alter table public.rounds add constraint rounds_games_size check (games is null or pg_column_size(games) < 20000);

-- Reminders can be about money games as well as trips and the Board.
alter table public.push_outbox add column if not exists ledger text check (ledger in ('board', 'games'));

-- "Ben posted your round" now says how you did in the games.
create or replace function private.tg_push_round() returns trigger
language plpgsql security definer set search_path = '' as $$
declare amt numeric;
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
  return null;
end $$;

create or replace function private.tg_push_outbox() returns trigger
language plpgsql security definer set search_path = '' as $$
declare t public.trips; l record; owe text[] := '{}'; owed text[] := '{}'; body text; ttl text; emo text;
begin
  if new.trip_id is not null then select * into t from public.trips where id = new.trip_id; end if;

  if new.kind = 'owe' then
    if t.id is null or t.created_by <> new.sender or t.ended_at is null or new.lines is null then
      raise exception 'Only the organizer can send settle-up for an ended trip';
    end if;
    if exists (select 1 from public.push_outbox o where o.id <> new.id and o.kind = 'owe' and o.trip_id = new.trip_id
               and o.recipient = new.recipient and o.created_at > now() - interval '10 minutes') then
      return null;
    end if;
    for l in select * from jsonb_to_recordset(new.lines) as x(u uuid, amt numeric, dir text) loop
      if l.u is null or l.amt is null or l.amt <= 0 or l.amt >= 100000 or l.dir not in ('owe', 'owed')
         or not private.is_trip_member(new.trip_id, l.u) then
        raise exception 'Bad settle-up line';
      end if;
      if l.dir = 'owe' then owe := owe || (private.hname(l.u) || ' ' || private.money(round(l.amt, 2)));
      else owed := owed || (private.hname(l.u) || ' ' || private.money(round(l.amt, 2))); end if;
    end loop;
    body := concat_ws(' ',
      case when cardinality(owe) > 0 then 'You owe ' || array_to_string(owe, ', ') || '.' end,
      case when cardinality(owed) > 0 then 'You''re owed: ' || array_to_string(owed, ', ') || '.' end);
    perform private.push(array[new.recipient], 'money', t.name || ' is over — time to settle up', body,
      '?go=trip&id=' || t.id, 'owe-' || t.id);

  elsif new.kind = 'nudge' then
    if new.amount is null then raise exception 'Reminder needs an amount'; end if;
    if exists (select 1 from public.push_outbox o where o.id <> new.id and o.kind = 'nudge' and o.sender = new.sender
               and o.recipient = new.recipient and o.created_at > now() - interval '12 hours') then
      raise exception 'Already reminded them today';
    end if;
    perform private.push(array[new.recipient], 'money',
      private.hname(new.sender) || ' says you owe them ' || private.money(round(new.amount, 2)),
      case when t.id is not null then 'For ' || t.name || '. Tap to settle up.'
           when new.ledger = 'games' then 'For your money games. Tap to settle up.'
           else 'From the Betting Board. Tap to settle up.' end,
      case when t.id is not null then '?go=trip&id=' || t.id when new.ledger = 'games' then '?go=player' else '?go=board' end,
      'nudge-' || new.sender);

  elsif new.kind = 'title' then
    select x.t, x.e into ttl, emo from (values
      ('hcp','Low Man','🎯'),('avg','Steady Eddie','📉'),('best','Course Record','🔥'),('t5','Tiger Tamer','🐯'),
      ('putts','Flat Stick','🪄'),('birdies','Birdie Machine','🐦'),('rounds','Grinder','🗓️'),('trophy','Trophy Hunter','🏆'),
      ('poo','Poo Lord','💩'),('beer','Beer Boss','🍺'),('shot','Shotgun Sheriff','💥'),('gb','Geeb God','💨'),
      ('club','Club Chucker','🪃'),('mush','Mush Man','🍄')) as x(k, t, e) where x.k = new.title_k;
    if ttl is null then raise exception 'Unknown title'; end if;
    if exists (select 1 from public.push_outbox o where o.id <> new.id and o.kind = 'title' and o.recipient = new.recipient
               and o.title_k = new.title_k and o.lost = new.lost and o.created_at > now() - interval '1 hour') then
      return null;
    end if;
    if new.lost then
      perform private.push(array[new.recipient], 'titles', emo || ' ' || private.hname(coalesce(new.other, new.sender)) || ' took ' || ttl || ' from you',
        'Post a round to take it back.', '?go=leaders', 'title-' || new.title_k);
    else
      perform private.push(array[new.recipient], 'titles', emo || ' You''re the new ' || ttl,
        'You lead your crew. Tap to see the Leaderboard.', '?go=leaders', 'title-' || new.title_k);
    end if;
  end if;
  return null;
end $$;
