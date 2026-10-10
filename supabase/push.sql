-- Push notifications.
-- Phones register in push_subscriptions; each player can switch categories off in push_prefs.
-- Database triggers (and push_outbox, for messages only the app can work out) put
-- notifications in private.push_queue and wake the `push` edge function, which sends them.

create extension if not exists pg_net schema extensions;

-- One row per phone/browser. Endpoints must belong to a real push service.
create table if not exists public.push_subscriptions (
  endpoint text primary key check (
    char_length(endpoint) <= 1000 and
    endpoint ~ '^https://(fcm\.googleapis\.com|updates\.push\.services\.mozilla\.com|web\.push\.apple\.com|[a-z0-9.-]+\.push\.apple\.com|[a-z0-9.-]+\.notify\.windows\.com)/'),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  p256dh text not null check (char_length(p256dh) <= 200),
  auth text not null check (char_length(auth) <= 100),
  created_at timestamptz not null default now()
);
alter table public.push_subscriptions enable row level security;
create policy "push subs read own" on public.push_subscriptions for select to authenticated using (user_id = auth.uid());
create policy "push subs delete own" on public.push_subscriptions for delete to authenticated using (user_id = auth.uid());

-- Saving goes through this function so a phone that was signed in as someone else
-- moves over to whoever is signed in now.
create or replace function public.save_push_subscription(endpoint text, p256dh text, auth text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  delete from public.push_subscriptions s where s.endpoint = save_push_subscription.endpoint;
  insert into public.push_subscriptions (endpoint, user_id, p256dh, auth)
  values (save_push_subscription.endpoint, auth.uid(), save_push_subscription.p256dh, save_push_subscription.auth);
end $$;
revoke execute on function public.save_push_subscription(text, text, text) from public, anon;
grant execute on function public.save_push_subscription(text, text, text) to authenticated;

-- Categories a player has switched off.
create table if not exists public.push_prefs (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  off text[] not null default '{}' check (off <@ array['friends','social','rounds','board','money','titles'])
);
alter table public.push_prefs enable row level security;
create policy "push prefs own" on public.push_prefs for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Waiting notifications (not reachable through the API).
create table if not exists private.push_queue (
  id bigint generated always as identity primary key,
  users uuid[] not null,
  kind text not null,
  title text not null,
  body text not null default '',
  url text not null default './',
  tag text,
  created_at timestamptz not null default now()
);

create or replace function private.hname(u uuid) returns text
language sql stable security definer set search_path = '' as $$
  select coalesce((select handle from public.profiles where id = u), 'Someone')
$$;

create or replace function private.money(v numeric) returns text
language sql immutable set search_path = '' as $$
  select '$' || case when v = trunc(v) then to_char(v, 'FM999990') else to_char(v, 'FM999990.00') end
$$;

-- Queue a notification and wake the sender. Never lets a notification problem
-- break the action that caused it.
create or replace function private.push(users uuid[], kind text, title text, body text, url text, tag text)
returns void language plpgsql security definer set search_path = '' as $$
declare us uuid[] := array(select distinct x from unnest(users) x where x is not null);
begin
  if coalesce(cardinality(us), 0) = 0 then return; end if;
  insert into private.push_queue (users, kind, title, body, url, tag)
  values (us, kind, left(title, 120), left(coalesce(body, ''), 240), coalesce(url, './'), tag);
  perform net.http_post(
    url := 'https://afzzyrfmlhfjqdpntuuv.supabase.co/functions/v1/push',
    body := '{}'::jsonb,
    headers := '{"Content-Type":"application/json"}'::jsonb,
    timeout_milliseconds := 10000);
exception when others then
  raise warning 'push not queued: %', sqlerrm;
end $$;

create or replace function private.round_line(r public.rounds) returns text
language sql stable set search_path = '' as $$
  select coalesce(r.course, 'A round') || coalesce(' · ' || r.score, '')
$$;

-- Friends: requests and accepts.
create or replace function private.tg_push_friend() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'INSERT' and new.status = 'pending' then
    perform private.push(array[new.addressee], 'friends', private.hname(new.requester) || ' sent you a friend request',
      'Tap to accept and see each other''s rounds.', '?go=friends', 'friend-' || new.requester);
  elsif tg_op = 'UPDATE' and old.status = 'pending' and new.status = 'accepted' then
    perform private.push(array[new.requester], 'friends', private.hname(new.addressee) || ' accepted your friend request',
      'You can now see each other''s rounds and bets.', '?go=player&id=' || new.addressee, 'friend-' || new.addressee);
  end if;
  return null;
end $$;
drop trigger if exists push_friend on public.friendships;
create trigger push_friend after insert or update on public.friendships for each row execute function private.tg_push_friend();

-- Social: likes, comments, attests.
create or replace function private.tg_push_social() returns trigger
language plpgsql security definer set search_path = '' as $$
declare r public.rounds; who text := private.hname(new.user_id); url text; others uuid[];
begin
  select * into r from public.rounds where id = new.round_id;
  if r.id is null then return null; end if;
  url := '?go=round&id=' || r.id;
  if tg_table_name = 'round_likes' then
    if r.user_id <> new.user_id then
      perform private.push(array[r.user_id], 'social', who || ' liked your round', private.round_line(r), url, 'like-' || r.id);
    end if;
  elsif tg_table_name = 'round_attests' then
    if r.user_id <> new.user_id then
      perform private.push(array[r.user_id], 'social', who || ' attested your round', 'Signed off on ' || private.round_line(r) || '.', url, 'attest-' || r.id);
    end if;
  elsif tg_table_name = 'round_comments' then
    if r.user_id <> new.user_id then
      perform private.push(array[r.user_id], 'social', who || ' commented on your round', left(new.body, 140), url, 'cmt-' || new.id);
    end if;
    -- Everyone else already in the conversation.
    others := array(select distinct c.user_id from public.round_comments c
                    where c.round_id = r.id and c.user_id <> new.user_id and c.user_id <> r.user_id);
    perform private.push(others, 'social',
      who || ' also commented on ' || case when r.user_id = new.user_id then 'their' else private.hname(r.user_id) || '''s' end || ' round',
      left(new.body, 140), url, 'cmt-' || new.id);
  end if;
  return null;
end $$;
drop trigger if exists push_like on public.round_likes;
create trigger push_like after insert on public.round_likes for each row execute function private.tg_push_social();
drop trigger if exists push_attest on public.round_attests;
create trigger push_attest after insert on public.round_attests for each row execute function private.tg_push_social();
drop trigger if exists push_comment on public.round_comments;
create trigger push_comment after insert on public.round_comments for each row execute function private.tg_push_social();

-- Rounds: a friend posted a round for you (group play).
create or replace function private.tg_push_round() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.entered_by is not null and new.entered_by <> new.user_id then
    perform private.push(array[new.user_id], 'rounds', private.hname(new.entered_by) || ' posted your round',
      coalesce(new.course, 'Your round') || coalesce(' · you shot ' || new.score, '') || '. Tap to see it.',
      '?go=round&id=' || new.id, 'round-' || new.id);
  end if;
  return null;
end $$;
drop trigger if exists push_round on public.rounds;
create trigger push_round after insert on public.rounds for each row execute function private.tg_push_round();

-- Betting Board: new bets go to the poster's friends; results go to everyone who picked.
create or replace function private.tg_push_board() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  pk record; win_total numeric; nwin int; amt numeric; opt text; friends uuid[];
begin
  if tg_op = 'INSERT' then
    friends := array(select case when f.requester = new.created_by then f.addressee else f.requester end
                      from public.friendships f
                      where f.status = 'accepted' and new.created_by in (f.requester, f.addressee));
    perform private.push(friends, 'board', 'New bet from ' || private.hname(new.created_by), new.title, '?go=board', 'bet-' || new.id);
  elsif new.status = 'settled' and old.status is distinct from 'settled' and new.winning_option is not null then
    opt := coalesce(new.options[new.winning_option + 1], 'The winner');
    select coalesce(sum(coalesce(amount, 0)), 0), count(*) into win_total, nwin
      from public.board_picks where bet_id = new.id and option = new.winning_option;
    for pk in select * from public.board_picks where bet_id = new.id and user_id <> new.created_by loop
      if pk.option = new.winning_option then
        -- Losers' money split among winners by how much each bet (evenly if winners bet $0).
        select coalesce(sum(case when win_total > 0 then coalesce(l.amount, 0) * coalesce(pk.amount, 0) / win_total
                                 else coalesce(l.amount, 0) / nwin end), 0)
          into amt from public.board_picks l where l.bet_id = new.id and l.option <> new.winning_option;
        amt := round(amt, 2);
        perform private.push(array[pk.user_id], 'board', 'You won: ' || new.title,
          '“' || opt || '” won.' || case when amt >= 0.01 then ' You''re up ' || private.money(amt) || ' 🎉' else ' 🎉' end,
          '?go=board', 'bet-' || new.id);
      else
        amt := coalesce(pk.amount, 0);
        perform private.push(array[pk.user_id], 'board', 'You lost: ' || new.title,
          '“' || opt || '” won.' || case when amt >= 0.01 then ' You owe ' || private.money(amt) || '.' else '' end,
          '?go=board', 'bet-' || new.id);
      end if;
    end loop;
  elsif new.status = 'void' and old.status is distinct from 'void' then
    perform private.push(array(select user_id from public.board_picks where bet_id = new.id and user_id <> new.created_by),
      'board', 'Bet called off: ' || new.title, 'No money changes hands.', '?go=board', 'bet-' || new.id);
  end if;
  return null;
end $$;
drop trigger if exists push_board on public.board_bets;
create trigger push_board after insert or update on public.board_bets for each row execute function private.tg_push_board();

-- Messages the app works out itself: trip settle-up, "you owe me" reminders, and titles.
create table if not exists public.push_outbox (
  id bigint generated always as identity primary key,
  sender uuid not null default auth.uid(),
  recipient uuid not null,
  kind text not null check (kind in ('owe', 'nudge', 'title')),
  trip_id uuid references public.trips(id) on delete cascade,
  amount numeric check (amount > 0 and amount < 100000),
  lines jsonb check (lines is null or (jsonb_typeof(lines) = 'array' and jsonb_array_length(lines) between 1 and 12)),
  title_k text,
  lost boolean not null default false,
  other uuid,
  created_at timestamptz not null default now(),
  check (recipient <> sender)
);
alter table public.push_outbox enable row level security;
create policy "push outbox send" on public.push_outbox for insert to authenticated with check (
  sender = auth.uid() and (
    private.are_friends(sender, recipient) or
    (trip_id is not null and (private.is_trip_member(trip_id, sender) or private.is_trip_owner(trip_id, sender))
                         and private.is_trip_member(trip_id, recipient))));

create or replace function private.tg_push_outbox() returns trigger
language plpgsql security definer set search_path = '' as $$
declare t public.trips; l record; owe text[] := '{}'; owed text[] := '{}'; body text; ttl text; emo text;
begin
  if new.trip_id is not null then select * into t from public.trips where id = new.trip_id; end if;

  if new.kind = 'owe' then
    -- Sent by the organizer when they end a trip.
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
      case when t.id is not null then 'For ' || t.name || '. Tap to settle up.' else 'From the Betting Board. Tap to settle up.' end,
      case when t.id is not null then '?go=trip&id=' || t.id else '?go=board' end, 'nudge-' || new.sender);

  elsif new.kind = 'title' then
    select x.t, x.e into ttl, emo from (values
      ('hcp','Low Man','🎯'),('avg','Steady Eddie','📉'),('best','Course Record','🔥'),('t5','Clean Card','✨'),
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
drop trigger if exists push_outbox_send on public.push_outbox;
create trigger push_outbox_send after insert on public.push_outbox for each row execute function private.tg_push_outbox();

-- Internal helpers are only for the triggers above.
revoke execute on function private.push(uuid[], text, text, text, text, text), private.hname(uuid), private.money(numeric),
  private.round_line(public.rounds) from public, anon, authenticated;
