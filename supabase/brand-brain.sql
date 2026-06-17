-- Vaelo — brand_brain table (per-client knowledge base)
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.brand_brain (
  id           uuid primary key default gen_random_uuid(),
  client_email text unique not null,
  client_name  text default '',
  colors       text default '',
  fonts        text default '',
  tone         text default '',
  audience     text default '',
  competitors  text default '',
  rules        text default '',
  links        text default '',   -- logo / asset links
  notes        text default '',
  updated_at   timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

create index if not exists brand_brain_email_idx on public.brand_brain (client_email);

alter table public.brand_brain enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.brand_brain to service_role;
