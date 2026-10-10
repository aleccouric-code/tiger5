-- Payments: settle-ups people have actually paid. Each one counts against what's owed
-- in one ledger: a trip's bets or receipts, the Betting Board, or money games.
--   * Marked by the person who was paid  -> counts right away (confirmed).
--   * Marked by the person who paid      -> waits for the other person to confirm.
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  payer uuid not null references auth.users(id) on delete cascade,
  payee uuid not null references auth.users(id) on delete cascade,
  amount numeric not null check (amount > 0 and amount < 100000),
  ledger text not null check (ledger in ('bets', 'receipts', 'board', 'games')),
  trip_id uuid references public.trips(id) on delete cascade,
  confirmed boolean not null default false,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  check (payer <> payee),
  check ((ledger in ('bets', 'receipts')) = (trip_id is not null))
);
create index if not exists payments_payer on public.payments (payer);
create index if not exists payments_payee on public.payments (payee);
create index if not exists payments_trip on public.payments (trip_id);
alter table public.payments enable row level security;

-- You see your own payments; trip players see the trip's (so everyone's settle-up adds up).
create policy "payments read" on public.payments for select to authenticated using (
  auth.uid() in (payer, payee) or (trip_id is not null and private.is_trip_member(trip_id, auth.uid())));

-- Record one you're part of. Only the person paid can create it already confirmed.
create policy "payments add" on public.payments for insert to authenticated with check (
  created_by = auth.uid() and auth.uid() in (payer, payee)
  and (not confirmed or auth.uid() = payee)
  and (trip_id is null or (private.is_trip_member(trip_id, payer) and private.is_trip_member(trip_id, payee))));

-- Only the person paid can confirm, and confirming is all an update can do.
create policy "payments confirm" on public.payments for update to authenticated
  using (payee = auth.uid()) with check (payee = auth.uid());
revoke update on public.payments from authenticated, anon;
grant update (confirmed, confirmed_at) on public.payments to authenticated;

-- Undo: whoever recorded it, or the person paid (e.g. "not yet" on a claim).
create policy "payments remove" on public.payments for delete to authenticated
  using (created_by = auth.uid() or payee = auth.uid());

-- Notifications.
create or replace function private.tg_push_payment() returns trigger
language plpgsql security definer set search_path = '' as $$
declare what text; url text;
begin
  select case when new.trip_id is not null then 'For ' || t.name || '.' when new.ledger = 'games' then 'For your money games.' else 'From the Betting Board.' end
    into what from (select 1) x left join public.trips t on t.id = new.trip_id;
  url := case when new.trip_id is not null then '?go=trip&id=' || new.trip_id when new.ledger = 'games' then '?go=player' else '?go=board' end;
  if tg_op = 'INSERT' and not new.confirmed then
    perform private.push(array[new.payee], 'money', private.hname(new.payer) || ' says they paid you ' || private.money(round(new.amount, 2)),
      what || ' Tap to confirm.', url, 'pay-' || new.id);
  elsif tg_op = 'INSERT' and new.confirmed then
    perform private.push(array[new.payer], 'money', private.hname(new.payee) || ' marked your ' || private.money(round(new.amount, 2)) || ' as paid',
      what, url, 'pay-' || new.id);
  elsif tg_op = 'UPDATE' and new.confirmed and not old.confirmed then
    perform private.push(array[new.payer], 'money', private.hname(new.payee) || ' confirmed your ' || private.money(round(new.amount, 2)) || ' payment',
      what, url, 'pay-' || new.id);
  end if;
  return null;
end $$;
drop trigger if exists push_payment on public.payments;
create trigger push_payment after insert or update on public.payments for each row execute function private.tg_push_payment();
