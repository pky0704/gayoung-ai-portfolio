-- Private work management. Run once in the existing Supabase project SQL editor.
-- Does not alter public portfolio records or existing storage policies.
create table if not exists public.work_items (
 id uuid primary key,
 type text not null check(type in ('site','prompt')),
 name text not null, description text not null default '',
 url text not null default '', "adminUrl" text not null default '',
 stage text not null default '미확인' check(stage in ('미확인','개발 중','개발 완료','개발 종료')),
 usage text not null default '미확인' check(usage in ('미확인','사용 중','테스트 중','사용 안 함')),
 "createdDate" text not null default '', thumbnail text not null default '', poster text not null default '',
 prompt text not null default '', notes text not null default '', archived boolean not null default false,
 updated_at timestamptz not null default now()
);
alter table public.work_items enable row level security;
revoke all on public.work_items from anon, authenticated;
grant all on public.work_items to service_role;
