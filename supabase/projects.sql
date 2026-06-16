-- Vaelo — projects table
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  client_name  text not null,
  client_email text default '',
  status       text not null default 'active',  -- onboarding | active | paused | completed
  proposal_id  uuid,
  created_at   timestamptz not null default now()
);

create index if not exists projects_created_at_idx on public.projects (created_at desc);
create index if not exists projects_email_idx on public.projects (client_email);

alter table public.projects enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.projects to service_role;
