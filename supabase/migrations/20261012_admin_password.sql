-- A single private counter. No passwords, IP addresses or user data are stored.
create table if not exists public.admin_login_budget (
 id integer primary key check (id = 1),
 window_started timestamptz not null,
 attempts integer not null
);
alter table public.admin_login_budget enable row level security;
revoke all on public.admin_login_budget from public, anon, authenticated;
create or replace function public.take_admin_login_attempt()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare used integer;
begin
 insert into public.admin_login_budget as budget (id,window_started,attempts)
 values (1,clock_timestamp(),1)
 on conflict (id) do update set
 attempts = case when budget.window_started <= clock_timestamp()-interval '5 minutes' then 1 else least(budget.attempts+1,21) end,
 window_started = case when budget.window_started <= clock_timestamp()-interval '5 minutes' then clock_timestamp() else budget.window_started end
 returning attempts into used;
 return used <= 20;
end;
$$;
revoke all on function public.take_admin_login_attempt() from public, anon, authenticated;
grant execute on function public.take_admin_login_attempt() to service_role;
