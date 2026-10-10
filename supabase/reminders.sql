-- The night before: one notification per player listing tomorrow's trip tee times.
-- Runs hourly and sends from 8 PM US Eastern; each tee time is reminded once
-- (the app clears reminded_on when a tee time is edited).
create extension if not exists pg_cron;

alter table public.tee_times add column if not exists reminded_on date;

-- `local` is the current US Eastern time (a parameter so it can be tested at any hour).
create or replace function private.tee_reminders_at(local timestamp) returns int
language plpgsql security definer set search_path = '' as $$
declare tomorrow date := local::date + 1; p record; n int := 0;
begin
  if extract(hour from local) < 20 then return 0; end if;
  for p in
    select x.uid, count(*) as rounds, min(x.trip_id::text)::uuid as trip_id,
           string_agg(x.line, ' · ' order by x.time) as body,
           (array_agg(x.short order by x.time))[1] as first
    from (
      select u as uid, tt.trip_id, tt.time,
             to_char(tt.time, 'FMHH12:MI AM') || ' at ' || tt.course as short,
             to_char(tt.time, 'FMHH12:MI AM') || ' at ' || tt.course
               || coalesce(' with ' || (select string_agg(private.hname(m), ', ') from unnest(tt.players) m where m <> u), '') as line
      from public.tee_times tt
      join public.trips t on t.id = tt.trip_id
      cross join unnest(tt.players) u
      where tt.day = tomorrow and tt.reminded_on is null and t.ended_at is null
    ) x
    group by x.uid
  loop
    perform private.push(array[p.uid], 'trips',
      case when p.rounds = 1 then 'Tomorrow: ' || p.first else 'Tomorrow: ' || p.rounds || ' rounds' end,
      p.body, '?go=trip&id=' || p.trip_id, 'tee-tomorrow');
    n := n + 1;
  end loop;
  update public.tee_times set reminded_on = local::date where day = tomorrow and reminded_on is null;
  return n;
end $$;

create or replace function private.tee_reminders() returns int
language sql security definer set search_path = '' as $$
  select private.tee_reminders_at((now() at time zone 'America/New_York')::timestamp)
$$;
revoke execute on function private.tee_reminders(), private.tee_reminders_at(timestamp) from public, anon, authenticated;

select cron.unschedule(jobid) from cron.job where jobname = 'tee-reminders';
select cron.schedule('tee-reminders', '0 * * * *', $$select private.tee_reminders()$$);
