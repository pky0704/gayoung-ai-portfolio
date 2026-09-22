-- Apply in the Supabase SQL editor. No credentials or administrator email are stored here.
create table if not exists public.projects (
 id uuid primary key,
 slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 title text not null, summary text not null, url text not null check (url ~ '^https://'),
 category text not null default '',status text not null default '',
 cover text not null default '', screenshots jsonb not null default '[]'::jsonb,
 capture_note text not null default '',captured_at text not null default '',
 problem text not null default '',steps text not null default '',process text not null default '',
 scope text not null default '',"next" text not null default '',
 visibility text not null default 'draft' check(visibility in ('draft','published','hidden','trash')),
 sort_order integer not null default 0,
 updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;
-- Access is deliberately server-only. All admin routes verify the authenticated Google user's UUID.
revoke all on public.projects from anon, authenticated;
grant all on public.projects to service_role;
create index if not exists projects_public_order on public.projects(visibility,sort_order);
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('project-assets','project-assets',false,4000000,array['image/webp'])
on conflict(id) do update set public=false,file_size_limit=4000000,allowed_mime_types=array['image/webp'];
-- No public storage policies: short-lived signed image URLs are issued by the server.
