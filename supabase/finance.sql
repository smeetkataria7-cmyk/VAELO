-- Vaelo — finance_entries (P&L: income / expenses, incl. recurring)
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.finance_entries (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  amount     numeric not null default 0,
  kind       text not null default 'expense',  -- income | expense
  recurring  boolean not null default false,
  months     integer not null default 1,       -- duration in months if recurring
  start_date date not null default current_date,
  notes      text default '',
  created_by text default '',
  created_at timestamptz not null default now()
);

create index if not exists finance_created_at_idx on public.finance_entries (created_at desc);

alter table public.finance_entries enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.finance_entries to service_role;
