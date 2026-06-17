-- Vaelo — ad reports (Meta / Amazon / Facebook etc.)
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.reports (
  id           uuid primary key default gen_random_uuid(),
  client_email text not null,
  title        text not null,
  period       text default '',
  platform     text default '',
  link         text default '',
  spend        numeric,
  reach        numeric,
  clicks       numeric,
  conversions  numeric,
  roas         text default '',
  notes        text default '',
  created_at   timestamptz not null default now()
);

create index if not exists reports_email_idx on public.reports (client_email);
create index if not exists reports_created_at_idx on public.reports (created_at desc);

alter table public.reports enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.reports to service_role;
