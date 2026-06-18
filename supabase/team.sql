-- Vaelo — team_members (UI-managed admins)
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.team_members (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  role       text not null default 'admin',  -- admin | super
  added_by   text default '',
  created_at timestamptz not null default now()
);

alter table public.team_members enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.team_members to service_role;
