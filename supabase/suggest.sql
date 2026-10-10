-- People You May Know: friends of your friends you aren't connected to yet
-- (no accepted, pending or ignored request either way), most mutual friends first.
-- Only returns names and photos (what a friend request shows anyway) plus which of
-- YOUR friends you have in common.
create or replace function public.suggested_friends()
returns table (id uuid, handle text, avatar_url text, mutual int, mutual_ids uuid[])
language sql stable security definer set search_path = '' as $$
  with me as (select auth.uid() as u),
  mine as (
    select case when f.requester = me.u then f.addressee else f.requester end as fid
    from public.friendships f, me
    where f.status = 'accepted' and me.u in (f.requester, f.addressee)),
  fof as (
    select case when f.requester = m.fid then f.addressee else f.requester end as cand, m.fid as via
    from public.friendships f join mine m on m.fid in (f.requester, f.addressee)
    where f.status = 'accepted')
  select p.id, p.handle, p.avatar_url, count(distinct fof.via)::int, (array_agg(distinct fof.via))[1:3]
  from fof join public.profiles p on p.id = fof.cand, me
  where me.u is not null and fof.cand <> me.u
    and not exists (select 1 from public.friendships x
                    where (x.requester = me.u and x.addressee = fof.cand) or (x.addressee = me.u and x.requester = fof.cand))
  group by p.id, p.handle, p.avatar_url
  order by 4 desc, p.handle
  limit 10
$$;
revoke execute on function public.suggested_friends() from public, anon;
grant execute on function public.suggested_friends() to authenticated;
