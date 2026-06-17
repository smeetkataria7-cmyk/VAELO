-- Vaelo — files (creative delivery + approval) + storage bucket
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.files (
  id           uuid primary key default gen_random_uuid(),
  client_email text not null,
  project_id   uuid,
  name         text not null,
  path         text not null,        -- storage path in the 'client-files' bucket
  type         text default '',
  status       text not null default 'pending',  -- pending | approved | revision
  comment      text default '',
  created_at   timestamptz not null default now()
);

create index if not exists files_email_idx on public.files (client_email);
create index if not exists files_created_at_idx on public.files (created_at desc);

alter table public.files enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.files to service_role;

-- Private storage bucket for client files (server/service-role access only).
insert into storage.buckets (id, name, public)
values ('client-files', 'client-files', false)
on conflict (id) do nothing;
