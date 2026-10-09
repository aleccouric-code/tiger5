-- Tiger 5 Betting Board: bets posted to friends for later.
-- Run once in Supabase after schema.sql: SQL Editor → New query → paste → Run.
-- Safe to run again. Tracking only: the app never moves money.

create table if not exists public.board_bets (
  id              uuid primary key,
  created_by      uuid not null default auth.uid() references public.profiles on delete cascade,
  title           text not null check (char_length(trim(title)) between 1 and 80),
  details         text check (details is null or char_length(details) <= 300),
  options         text[] not null default '{Yes,No}' check (array_length(options, 1) between 2 and 6),
  stake           numeric(8,2) not null default 0 check (stake >= 0),
  status          text not null default 'open' check (status in ('open','locked','settled','void')),
  winning_option  int check (winning_option is null or winning_option >= 0),
  settle_by       date,
  created_at      timestamptz not null default now(),
  settled_at      timestamptz
);
create index if not exists board_bets_creator on public.board_bets (created_by);

create table if not exists public.board_picks (
  bet_id      uuid not null references public.board_bets on delete cascade,
  user_id     uuid not null references public.profiles on delete cascade,
  option      int not null check (option >= 0),
  created_at  timestamptz not null default now(),
  primary key (bet_id, user_id)
);

create or replace function private.has_board_pick(b uuid, u uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.board_picks where bet_id = b and user_id = u);
$$;
-- You see a board bet if you posted it, you're friends with who posted it, or you've picked on it.
create or replace function private.can_see_board_bet(b uuid, u uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.board_bets x where x.id = b
      and (x.created_by = u or private.are_friends(u, x.created_by) or private.has_board_pick(b, u))
  );
$$;
create or replace function private.board_bet_open(b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.board_bets where id = b and status = 'open');
$$;
-- Names of people on a bet you can see (the poster and everyone who picked).
create or replace function private.board_visible_player(viewer uuid, p uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.board_bets x
    where (x.created_by = p or private.has_board_pick(x.id, p))
      and private.can_see_board_bet(x.id, viewer)
  );
$$;
revoke all on all functions in schema private from public, anon;
grant execute on all functions in schema private to authenticated;

alter table public.board_bets  enable row level security;
alter table public.board_picks enable row level security;

-- Bets: the poster's friends can see them; only the poster locks, settles, voids or deletes.
drop policy if exists "board bets read" on public.board_bets;
create policy "board bets read" on public.board_bets for select to authenticated
  using (created_by = auth.uid() or private.are_friends(auth.uid(), created_by) or private.has_board_pick(id, auth.uid()));
drop policy if exists "board bets post" on public.board_bets;
create policy "board bets post" on public.board_bets for insert to authenticated
  with check (created_by = auth.uid() and status = 'open' and winning_option is null);
drop policy if exists "board bets manage" on public.board_bets;
create policy "board bets manage" on public.board_bets for update to authenticated
  using (created_by = auth.uid()) with check (created_by = auth.uid());
drop policy if exists "board bets delete" on public.board_bets;
create policy "board bets delete" on public.board_bets for delete to authenticated
  using (created_by = auth.uid());

-- Picks: anyone who can see an open bet picks, changes or withdraws their own pick.
drop policy if exists "board picks read" on public.board_picks;
create policy "board picks read" on public.board_picks for select to authenticated
  using (private.can_see_board_bet(bet_id, auth.uid()));
drop policy if exists "board picks make" on public.board_picks;
create policy "board picks make" on public.board_picks for insert to authenticated
  with check (user_id = auth.uid() and private.board_bet_open(bet_id) and private.can_see_board_bet(bet_id, auth.uid()));
drop policy if exists "board picks change" on public.board_picks;
create policy "board picks change" on public.board_picks for update to authenticated
  using (user_id = auth.uid() and private.board_bet_open(bet_id))
  with check (user_id = auth.uid() and private.board_bet_open(bet_id));
drop policy if exists "board picks withdraw" on public.board_picks;
create policy "board picks withdraw" on public.board_picks for delete to authenticated
  using (user_id = auth.uid() and private.board_bet_open(bet_id));

drop policy if exists "profiles read board" on public.profiles;
create policy "profiles read board" on public.profiles for select to authenticated
  using (private.board_visible_player(auth.uid(), id));
