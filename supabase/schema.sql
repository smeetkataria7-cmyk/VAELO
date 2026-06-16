-- VAELO — database schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).
-- Phase 1 only needs the `leads` table. More tables come in later phases
-- (see docs/04-DATA-MODEL.md).

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  brand       text not null,
  email       text not null,
  instagram   text default '',
  goal        text default '',
  source      text default 'website',
  status      text default 'new',
  created_at  timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- Enable Row-Level Security. We access leads only via the service-role key on the
-- server, which bypasses RLS. With RLS on and no public policies, the anon/public
-- key cannot read or write leads — exactly what we want.
alter table public.leads enable row level security;

-- Grant table privileges to the service role ONLY. Required because this project
-- has "Automatically expose new tables" disabled (so no grants are created by
-- default). The service key bypasses RLS *policies* but still needs this GRANT.
-- We intentionally do NOT grant to anon/authenticated — keeps leads server-only.
grant usage on schema public to service_role;
grant all privileges on table public.leads to service_role;
